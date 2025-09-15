import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { setTokenCookie, verifyEmail } from "../services/AccountService";

export default function VerifyEmailPage() {
    const { verify_token } = useParams();
    const nav = useNavigate();
    useEffect(() => {
        const time = setTimeout(() => {
            const fetch = async () => {
                try {
                    const res = await verifyEmail(verify_token);
                    if (!res) {
                        nav('/');
                    }
                    if (res.status == 'failed') {
                        nav('/');
                    }
                    setTokenCookie(res.data.access_token, 20);
                    window.localStorage.setItem('alex_account_username', res.data.user_name);
                    window.localStorage.setItem('alex_account_email', res.data.email);
                    window.localStorage.setItem('alex_account_id', res.data.user_id);
                    nav('/signup?verify=1');
                } catch (err) {
                    nav('/');
                }
            }
            fetch();
        }, 1500);
        return () => clearTimeout(time);
    })
    return (<>
        <div className="verify-loading">
            <svg height="48px" width="64px">
                <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
                <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
                <polyline id="front2" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
            </svg>
        </div>
    </>)
}