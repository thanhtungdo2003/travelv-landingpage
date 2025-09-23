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
                    <h1>Viet Nam Discovery</h1>
                    <p>Beautiful destinations await you.</p>
                </div>
            </section>
        </section>
        <div className='about-travel-vietnam'>
            <div className='about-travel-vietnam-content'>
                <h1>The Rich and Diverse Tourism Culture of Vietnam</h1>
                <p>
                    Vietnam’s tourism culture is a colorful mosaic, where centuries-old traditions blend with modern charm. In the North, Hanoi and Ha Long Bay showcase elegant temples, vibrant street food, and serene mountain villages. The Central coast dazzles with Hue’s imperial cuisine and Da Nang’s beaches, while the South bursts with Saigon’s energy, the Mekong Delta’s floating markets, and endless tropical flavors.
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
                    <h4>{'>'} See all</h4>
                    <h1>HOT TOUR</h1>
                    <p>Recently selected tours.</p>
                </div>
            </div>
        </section>
        <section className="home-section">
            <div class="curvy-section location-outstanding">
                <div className='show-more-container'>
                    <h4>{'>'} See all</h4>
                    <h1>Featured Destinations</h1>
                    <p>Most popular destinations.</p>
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
                    Service Request
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
                                Your Name
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
                                Service Type
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
                                <option value="">Select a service</option>
                                <option value="qr-generation">QR Code Generation</option>
                                <option value="qr-custom">QR Code Customization</option>
                                <option value="qr-analytics">QR Code Analytics</option>
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
                                Message
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
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </>)
}
export default Home