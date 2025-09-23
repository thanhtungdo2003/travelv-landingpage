import { ArrowRight, ArrowRightSquareIcon, ArrowUpRightFromSquare, Lock, Mail, MailCheck, RotateCcw, Send } from "lucide-react";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import { useNavigate, useSearchParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { isEmail, sendVerifyEmail, update } from "../services/AccountService";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const nav = useNavigate();
    const [searchParams] = useSearchParams();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username: "",
        repassword: ""
    });
    const [error, setError] = useState("")
    const [load, setLoad] = useState(false)
    const [successSendEmail, setSuccessSendEmail] = useState(false)
    const [verify, setVerify] = useState(false)
    useEffect(() => {
        const checkVerify = searchParams.get("verify");

        if (checkVerify == 1) {
            setVerify(true)
            setUserData({
                email: "",
                password: "",
                repassword: "",
                username: window.localStorage.getItem('account_username')
            })
        }
    }, [])
    return (<div className="login-page" style={{
        width: "100vw",
        height: "100vh",
        display: "flex"
    }}>
        <div className="sign-about-page">
            <div className="icon"><div style={{ display: "flex" }}>TRAVEL VIETNAM <div onClick={() => nav('/')} className="link"><ArrowUpRightFromSquare color="rgba(255, 255, 255, 1)" /></div></div></div>
            <div className="about">The Rich and Diverse Tourism Culture of Vietnam</div>
        </div>
        <div className="signin-form-container">
            <div className="signin-form">
                <div className="signin-form-header">
                    <div className="signin-form-title">{verify ? `WELCOME '${userData.username}'` : "SIGN UP"}</div>
                    <div className="signin-form-sub">{verify ? `Change your new password` : "Sign up account with email"}</div>
                </div>
                {!successSendEmail ? <div className="sign-form-content">
                    <TextField
                        borderRadius={5}
                        border={'1px solid white'}
                        backgroundColor={"#0404041c"}
                        iconRight={verify ? <Lock /> : <Mail />}
                        label={verify ? "Password" : 'Email'}
                        placeholder={verify ? "Password" : 'Email'}
                        value={verify ? userData.password : userData.email}
                        onChange={(e) => {
                            if (verify) {
                                setUserData({ ...userData, password: e.target.value });

                            } else {
                                setUserData({ ...userData, email: e.target.value });
                                if (userData.email == "") {
                                    setError("Email is require!")
                                }
                                if (!isEmail(userData.email)) {
                                    setError("Input must be email!")
                                }
                            }
                        }}
                        error={(!verify && (userData.email == "" || !isEmail(userData.email))) || (verify && (userData.password.length < 6))}
                        labelError={'none'}
                        type={verify ? "password" : 'email'}
                    /><br />
                    {verify ? <TextField
                        borderRadius={5}
                        border={'1px solid white'}
                        backgroundColor={"#0404041c"}
                        iconRight={<Lock />}
                        label={"Confirm password"}
                        placeholder={"Re-enter password"}
                        value={userData.repassword}
                        onChange={(e) => {
                            setUserData({ ...userData, repassword: e.target.value });
                        }}
                        error={userData.repassword != userData.password}
                        labelError={'none'}
                        type={"password"}
                    /> : <></>}
                </div> : <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}><MailCheck size={50} color="#29ab66ff" /></div>
                    <div style={{ color: "white", textAlign: "center", color: "#ffffffff" }}>Send verify email successfully! check your mail</div>
                </div>}
                <div className="sign-form-btns">
                    {verify ? <Button
                        disable={userData.password == "" || userData.password.length < 6}
                        value={"Enter"}
                        onClick={() => {
                            const fetch = async () => {
                                const { password } = userData;
                                const res = await update({ password: password });

                                if (res.status == 'success') {
                                    nav('/')
                                } else {
                                    toast.error(res?.response?.data?.detail)
                                }

                            }
                            fetch();
                        }}
                    /> : <Button
                        disable={(!verify && (userData.email == "" || !isEmail(userData.email))) || load}
                        iconRight={successSendEmail ? <RotateCcw color="#616161ff" /> : <Send color="#616161ff" />}
                        value={successSendEmail ? 'Resend' : "Send"}
                        onClick={() => {
                            const fetch = async () => {
                                try {
                                    setLoad(true)
                                    const res = await sendVerifyEmail(userData.email);
                                    if (res.status == "success") {
                                        setSuccessSendEmail(true);
                                    } else {
                                        setSuccessSendEmail(false);
                                        toast.error(res.error)
                                    }
                                    setLoad(false)

                                } catch {

                                }
                            }
                            fetch();
                        }}
                    />}
                </div>
                <div className="sign-nav-container">
                    You do have an account? <strong onClick={() => {
                        nav('/signin')
                    }}> Login</strong>
                </div>
                <div className="login-with-otherapp-btns">
                    <label htmlFor="">Login with</label>
                    <button className="login-with-google-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" />
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                        </svg>
                        Continue with Google
                    </button>
                    <button
                        class="login-with-facebook-btn"
                    >
                        <svg
                            class="w-6 fill-zinc-200"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                        >
                            <path
                                d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"
                            ></path>
                        </svg>
                        Login with Facebook
                    </button>
                </div>
            </div>
        </div>
    </div>)
}