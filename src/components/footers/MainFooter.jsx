import './style.css'
function MainFooter() {
    return (<>
        <footer className="">
            <div className="footer-container">
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-section">
                            <h3 className="logo-footer h4 mb-3">TRAVEL V</h3>
                            <p className="mb-4">Our Vietnam travel website lets you explore a wide range of destinations and landmarks across the country.
                                Each landmark offers curated tour packages where you can pick the perfect experience for your trip.
                                You can also customize these tours, adjusting the itinerary and packages to match your personal style.</p>
                            
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-section">
                            <h4 className="h4 mb-3 text-uppercase fw-bold" style={{ letterSpacing: "7px" }}>Our Newsletter</h4>
                            <p className="mb-3">Subscribe to our newsletter to receive our latest news and special offers.</p>
                            <div className="input-group mb-3" style={{ height: "50px" }}>
                                <input type="email"
                                    className="form-control bg-white border-1 text-black"
                                    placeholder="Enter your email"
                                    style={{
                                        height: '100%',
                                        borderRadius: '25px 0 0 25px',
                                        padding: '0 20px',
                                        fontSize: '1rem'
                                    }}
                                />
                                <button className="btn btn-primary"
                                    type="button"
                                    style={{
                                        height: '100%',
                                        borderRadius: '0 25px 25px 0',
                                        minWidth: '120px',
                                        fontWeight: 500
                                    }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5 pt-4 border-top border-secondary">
                    <p className="mb-0">© 2026 Travel V. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </>)
}
export default MainFooter