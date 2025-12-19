import './page.css'
import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGencode } from '../contexts/gencode';
import TourCard from '../components/tour/TourCard';
import LocationCard from '../components/location/LocationCard';
import useTour from '../contexts/tourcontext';
import api from '../cores/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import OutstandingTours from '../components/tour/OutstandingTours';
import OutstandingDestinations from '../components/location/OutstandingDestination';


function Home() {
    const nav = useNavigate();
    const { tours, setTours } = useTour();
    const [bestDestinations, setBestDestinations] = useState([]);
    useEffect(() => {
        api.post('/v1/tours/get', {
            id: "",
            searchKeyword: "",
            page: 1,
            row: 3
        }).then((res) => {
            setTours(res?.data?.data);
        }).catch((err) => {
            toast.error(err?.status)
        })
        api.post('/v1/destinations/get', {
            id: "",
            searchKeyword: "",
            page: 1,
            row: 3
        }).then((res) => {
            setBestDestinations(res?.data?.data);
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [])
    return (<>

        <section className="home home-section">
            <section class="curvy-section top-slide">
                <div>
                    <h1>Khám Phá Việt Nam</h1>
                    <p>Những điểm đến tuyệt đẹp đang chờ đón bạn.</p>
                </div>
            </section>
        </section>
        <div className='about-travel-vietnam'>
            <div className='about-travel-vietnam-content'>
                <h1>Nền Văn Hóa Du Lịch Phong Phú và Đa Dạng Của Việt Nam</h1>
                <p>
                    Văn hóa du lịch Việt Nam là một bức tranh khảm màu sắc, nơi truyền thống hàng trăm năm hòa quyện với nét quyến rũ hiện đại. Ở miền Bắc, Hà Nội và Vịnh Hạ Long khoe sắc với những ngôi đền thanh lịch, ẩm thực đường phố sôi động và những ngôi làng miền núi thanh bình. Miền Trung lấp lánh với ẩm thực hoàng gia Huế và những bãi biển Đà Nẵng, trong khi miền Nam tràn đầy năng lượng Sài Gòn, chợ nổi đồng bằng sông Cửu Long và hương vị nhiệt đới vô tận.
                </p>
            </div>
            <div className='about-travel-vietnam-imgs'>
                <img style={{ width: 500 }} src='./halong-about.jpg' />
                <div style={{ width: 500, height: 500 }}>
                    <img style={{ width: 500, height: 250 }} src='./langbac-about.jpg' />
                    <img style={{ width: 500, height: 250 }} src='./caurong-about.jpg' />
                </div>
                <img style={{ width: 250, height: 300 }} src='./phuquoc-about.jpg' />
                <div style={{ width: 250, height: 150 }}>
                    <img style={{ width: 250, height: 150, objectFit: 'contain' }} src='flag-map-vietnam.png' />
                    <img style={{ width: 250, height: 150 }} src='./cauvang-about.jpg' />

                </div>
                <img style={{ width: 500, height: 300 }} src='./bavang-about.jpg' />
                <img style={{ width: 450, height: 300 }} src='./chonoi-about.jpg' />
                <img style={{ width: 550, height: 300 }} src='./bacson-about.jpg' />
            </div>
        </div>
        <section className="home-section hot-tour-section">
            <div style={{width:"70%"}}>
                <OutstandingTours />
            </div>

            <div class="curvy-section hot-tour">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <clipPath id="wave" clipPathUnits="objectBoundingBox">
                        <path d="
                            M1,0
                            L1,1
                            C0.6,1 0.7,0.7 0.7,0.6
                            C0.6,0.3 0.8,0.5 0.7,0.3
                            C0.6,0.0 1,0.0 1,0
                            Z
                            " />
                    </clipPath>
                </svg>
                <div>
                    <h4>{'>'} Xem tất cả</h4>
                    <h1>TOUR NỔI BẬT</h1>
                    <p>Các tour được lựa chọn gần đây.</p>
                </div>
            </div>
        </section>
        <section className="home-section">
            <div class="curvy-section location-outstanding">
                <div className='show-more-container'>
                    <h4>{'>'} Xem tất cả</h4>
                    <h1>Điểm Đến Nổi Bật</h1>
                    <p>Những điểm đến phổ biến nhất.</p>
                </div>
                <div style={{width:'100%'}}>
                    <OutstandingDestinations/>
                </div>
            </div>

        </section>

        <section
            id="service-form"
            className="service-section home-section"
            style={{ display: "none", padding: "60px 20px" }}
        >
            <div className="container">
                <h2
                    className="text-center mb-5"
                    style={{ color: "#ffffff" }}
                >
                    Yêu Cầu Dịch Vụ
                </h2>
                <div
                    className="service-form-container"
                    style={{ maxWidth: "600px", margin: "0 auto" }}
                >
                    <form id="serviceRequest">
                        <div className="form-group mb-4">
                            <label
                                style={{
                                    color: "#ffffff",
                                    marginBottom: "8px",
                                    display: "block",
                                }}
                            >
                                Họ và Tên
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                style={{
                                    backgroundColor: "#2a2a2a",
                                    border: "1px solid #333",
                                    color: "white",
                                    padding: "12px",
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label
                                style={{
                                    color: "#ffffff",
                                    marginBottom: "8px",
                                    display: "block",
                                }}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                style={{
                                    backgroundColor: "#2a2a2a",
                                    border: "1px solid #333",
                                    color: "white",
                                    padding: "12px",
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label
                                style={{
                                    color: "#ffffff",
                                    marginBottom: "8px",
                                    display: "block",
                                }}
                            >
                                Loại Dịch Vụ
                            </label>
                            <select
                                className="form-control"
                                style={{
                                    backgroundColor: "#2a2a2a",
                                    border: "1px solid #333",
                                    color: "white",
                                    padding: "12px",
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                            >
                                <option value="">Chọn dịch vụ</option>
                                <option value="qr-generation">Tạo Mã QR</option>
                                <option value="qr-custom">Tùy Chỉnh Mã QR</option>
                                <option value="qr-analytics">Phân Tích Mã QR</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label
                                style={{
                                    color: "#ffffff",
                                    marginBottom: "8px",
                                    display: "block",
                                }}
                            >
                                Tin Nhắn
                            </label>
                            <textarea
                                className="form-control"
                                rows="4"
                                style={{
                                    backgroundColor: "#2a2a2a",
                                    border: "1px solid #333",
                                    color: "white",
                                    padding: "12px",
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
                                color: "white",
                                padding: "12px 30px",
                                border: "none",
                                borderRadius: "30px",
                                cursor: "pointer",
                                display: "block",
                                margin: "0 auto",
                            }}
                        >
                            Gửi Yêu Cầu
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </>)
}
export default Home