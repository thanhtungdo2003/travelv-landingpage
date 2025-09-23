import { ArrowLeft, Check, CheckCircle, ChevronDown, Download, Expand, File, FormInput, Info, Loader, Loader2, Minus, Plus, Printer, Table, Text, Wallet } from "lucide-react";
import { useLocation, useParams } from "react-router-dom"
import Button from "../../components/ui/Button";
import './style.css'
import '../page.css'
import 'react-phone-input-2/lib/style.css'
import { useEffect, useState } from "react";
import api from "../../cores/axios";
import PaymentMethodBox from "./PaymentMethodBox";
import { toast } from "react-toastify";
import { formatDate } from "../../services/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getTokenCookie } from "../../services/AccountService";

export default function PaymentPage() {
    const location = useLocation();
    const [payMethod, setPayMethod] = useState('')
    const [showExportSelect, setShowExportSelect] = useState(false);
    const [createPayLoading, setCreatePayLoading] = useState(false);
    const [province, setProvince] = useState([]);
    const [thisBooking, setThisBooking] = useState({
        id: "",
        phone: "",
        user_id: "",
        province: "",
        specific_address: "",
        pickup_lng: null,
        created_at: "",
        fullname: "",
        email: "",
        status: "",
        tour_id: "",
        ward: "",
        total_amount: 0,
        pickup_lat: null,
        diparture_at: "",
        passengers: [
            {
                bookings_id: "",
                id: "",
                created_at: "",
                age_type: "",
                fullname: "",
                birth_day: "",
            },
        ],
        tour: {
            title: "",
            destination_id: "",
            tag: "",
            slots: 0,
            start_location: "",
            description: "",
            imageURLs: "",
            created_at: "",
            id: "",
            vehicle: "",
            price: 0,
            first_location: "",
            estimated_time: "",
            thumbnailURL: "",
            views: 0,
        },
    })
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://provinces.open-api.vn/api/v2/?depth=2')
            const data = await res.json();
            setProvince(data);
        }
        fetchData();
        api.get(`/v1/bookings/get/${id}`).then((res) => {
            setThisBooking(res?.data)
        }).catch((err) => {
            toast.error(err.status)
        })
    }, []);

    const exportPDF = () => {
        const input = document.getElementById("booking-table");
        if (!input) return;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "a4",
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`booking_${thisBooking?.id}.pdf`);
        });
    };

    const exportExcel = () => {
        const data = [
            {
                "Booking ID": thisBooking?.id,
                Fullname: thisBooking?.fullname,
                Email: thisBooking?.email,
                Phone: thisBooking?.phone,
                Status: thisBooking?.status,
                Tour: thisBooking?.tour?.title,
                "Pickup Address": `${thisBooking?.specific_address}, ${province?.find(p => p.codename === thisBooking?.province)?.name
                    }, ${province?.find(p => p.codename === thisBooking?.province)?.wards?.find(
                        w => w.codename === thisBooking?.ward
                    )?.name
                    }`,
                "Departure At": formatDate(thisBooking?.diparture_at),
                Total: thisBooking?.total_amount,
            },
        ];
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Booking");
        const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([buf], { type: "application/octet-stream" });
        saveAs(blob, `booking_${thisBooking?.id}.xlsx`);
    };
    return (<>
        <head><title>{`Payment`}</title></head>
        <div className="container-page">
            <div style={{ display: "flex" }}>
                <div style={{
                    position: "absolute"
                }}><Button value={'Back to booking'} backgroundColor={'transparent'} iconLeft={<ArrowLeft color="black" />} /></div>
                <h1 style={{ flex: 2, textAlign: "center" }}>TOUR BOOKING</h1>
            </div>
            <div className="booking-steps">
                <div className="b__step active">
                    <FormInput size={35} />
                    <span>Fill info</span>
                </div>
                <div className="b__step-line"></div>
                <div className="b__step active">
                    <Wallet size={35} />
                    <span>Payment</span>
                </div>
                <div className="b__step-line"></div>
                <div className="b__step">
                    <CheckCircle size={35} />
                    <span>Done</span>
                </div>
            </div>
            <div className="payment-main-container">
                <div className="bill-container">
                    <table id="booking-table">
                        <tr>
                            <th>Booking ID</th>
                            <td>{thisBooking?.id}</td>
                        </tr>
                        <tr>
                            <th>Fullname</th>
                            <td>{thisBooking?.fullname}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{thisBooking?.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{thisBooking?.phone}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{thisBooking?.status}</td>
                        </tr>
                        <tr>
                            <th>Tour</th>
                            <td><a href={`/tour/${thisBooking?.tour.id}`} target="_blank">{thisBooking?.tour.title}</a></td>
                        </tr>
                        <tr>
                            <th>Passengers</th>
                            <td>
                                {thisBooking?.passengers.map((p, i) => {
                                    return <div className="passenger-row-item">
                                        <div>
                                            <div><strong>Fullname:</strong> {p.fullname}</div>
                                            <div><strong>Birth day:</strong> {formatDate(p.birth_day)}</div>
                                            <div><strong>Age type:</strong> {p.age_type}</div>
                                        </div>
                                        <div>
                                            {p.age_type == "Adult" ? thisBooking?.tour.price.toLocaleString() : (thisBooking?.tour.price * 0.8).toLocaleString()} VND
                                        </div>
                                    </div>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th>Pickup Address</th>
                            <td>{thisBooking?.specific_address}, {province?.find(p => p.codename === thisBooking?.province)?.name} , {province?.find(p => p.codename === thisBooking?.province)?.wards?.find(w => w.codename === thisBooking?.ward)?.name}</td>
                        </tr>
                        <tr>
                            <th>Departure At</th>
                            <td>{formatDate(thisBooking?.diparture_at)}</td>
                        </tr>
                        <tr>
                            <th>Discount</th>
                            <td>0 VND</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td><strong style={{ fontSize: 20 }}>{thisBooking?.total_amount.toLocaleString()}</strong> VND</td>
                        </tr>
                    </table>
                    <div className="bookings-btns">
                        <button className="export-btn"
                            onFocus={() => setShowExportSelect(true)}
                            onBlur={() => setShowExportSelect(false)}
                        >
                            <div className="___title"><Download />Export</div>
                            <div className="btn-selects">
                                <ChevronDown />
                            </div>
                            <div className={`btn-select-box ${showExportSelect ? 'show' : 'hide'}`}>
                                <div onClick={exportPDF}><File color="#333" strokeWidth={1} />Export to PDF</div>
                                <div onClick={exportExcel}><Table color="#333" strokeWidth={1} />Export to Excel</div>
                            </div>
                        </button>

                        <Button iconLeft={createPayLoading ? <Loader2 className="loader" /> : <Check />}
                            flex={2}
                            backgroundColor={"#2f7cbbff"}
                            color={'white'}
                            value={payMethod == '' ? 'Choose your pay method' : `Create ${payMethod} payment link`}
                            disable={payMethod == '' || createPayLoading}
                            onClick={() => {
                                setCreatePayLoading(true);
                                api.post(`/v1/payment/${payMethod}/create/${thisBooking.id}`, {}, {
                                    headers: {
                                        Authorization: `Bearer ${getTokenCookie()}`
                                    }
                                }).then((res) => {
                                    switch (payMethod) {
                                        case 'momo':
                                            return window.open(res?.data?.payUrl, '_parent')
                                        case 'paypal':
                                            return window.open(res?.data?.approve_url, '_parent')
                                    }
                                }).catch((err) => {
                                    toast.error(`Payment link creation failed, choose other pay method, try again in a few minutes or contact admin`)
                                }).finally(() => {
                                    setCreatePayLoading(false)
                                })
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div className="confirm-container">
                        <PaymentMethodBox onPaymentChange={(value) => setPayMethod(value)} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}
