import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { setTokenCookie, verifyEmail } from "../../services/AccountService";
import { paypalCapture } from "../../services/PaymentService";
import { toast } from "react-toastify";
import './style.css';
import { ArrowLeft, Frown, RotateCcw } from "lucide-react";
import Button from "../../components/ui/Button";
import { parseJwt } from "../../services/utils";

export default function PayPalSuccessPage() {
    const nav = useNavigate();
    const { order_token } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const payerId = queryParams.get("PayerID");
    const [loading, setLoading] = useState(false);
    const [runAmount, increseRunAmount] = useState(0);
    useEffect(() => {
        setLoading(true)
        const time = setTimeout(() => {
            const fetch = async () => {
                try {
                    const res = await paypalCapture(order_token, token)
                    if (res?.id) {
                        toast.success('Booking successffully! Thank for join');
                        nav(`/receipt/${res.id}`)
                    } else {
                        toast.error('Pay unsuccessffully | Try again or contact Admin');
                    }
                } catch (err) {
                    toast.error('Pay unsuccessffully | Try again or contact Admin');

                } finally {
                    setLoading(false);
                }
            }
            fetch();
        }, 2500);
        return () => clearTimeout(time);
    }, [runAmount])
    return (<>
        <div className="verify-loading">
            {loading ? <div class="virtual-card">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 111 84"
                    height="84"
                    width="111"
                >
                    <rect
                        stroke-dasharray="4 4"
                        stroke-width="2"
                        stroke="black"
                        fill="white"
                        transform="matrix(-1.31134e-07 1 1 1.31134e-07 -1.31134e-07 40.7759)"
                        rx="3.40064"
                        height="65.6552"
                        width="41.2241"
                        y="1"
                        x="1"
                    ></rect>
                    <rect
                        fill="black"
                        transform="rotate(-180 65.7758 58.6293)"
                        height="10.3362"
                        width="63.8966"
                        y="58.6293"
                        x="65.7758"
                    ></rect>
                    <path
                        class="plus-one"
                        stroke-width="2"
                        stroke="black"
                        d="M70.8334 15L70.8334 19.6954M70.8334 19.6954H66.1379M70.8334 19.6954H75.5288M70.8334 19.6954V24.3909"
                    ></path>
                    <path
                        class="plus-two"
                        stroke-width="2"
                        stroke="black"
                        d="M93.955 39L93.955 45.8171M93.955 45.8171H87.1379M93.955 45.8171H100.772M93.955 45.8171V52.6341"
                    ></path>
                    <path
                        class="plus-three"
                        stroke-width="2"
                        stroke="black"
                        d="M99.9622 0L99.9622 10.8242M99.9622 10.8242H89.1379M99.9622 10.8242H110.786M99.9622 10.8242V21.6484"
                    ></path>
                    <path
                        class="plus-four"
                        stroke-width="2"
                        stroke="black"
                        d="M87.4913 22L87.4913 26.3535M87.4913 26.3535H83.1379M87.4913 26.3535H91.8448M87.4913 26.3535V30.7069"
                    ></path>
                    <path
                        class="plus-five"
                        stroke-width="2"
                        stroke="black"
                        d="M77.8447 1V3.70685M77.8447 3.70685H75.1379M77.8447 3.70685H80.5516M77.8447 3.70685V6.4137"
                    ></path>
                    <path
                        class="plus"
                        stroke-width="2"
                        stroke="black"
                        d="M76.8447 40V42.7068M76.8447 42.7068H74.1379M76.8447 42.7068H79.5516M76.8447 42.7068V45.4137"
                    ></path>
                </svg>
            </div> : <>
                <div style={{ margin: "auto auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50%" }}>
                    <Frown color="#555" strokeWidth={1} size={60} />
                    <p>Payment failed, try again or report to admin if you lose money, we are very sorry for the unpleasant experience you have had.</p>
                    <div>
                        <Button iconLeft={<ArrowLeft color="black" />} value={'Back to bill page'} onClick={()=>{
                            const booking = parseJwt(order_token);
                            nav('/payment/'+booking.booking_id)
                        }}/>
                        <Button iconLeft={<RotateCcw color="black" />} value={'Try again'} onClick={() => increseRunAmount(runAmount + 1)} />
                    </div>
                </div>
            </>}
        </div>
    </>)
}