import './style.css'
function MainFooter() {
    return (<>
        <footer className="">
            <div className="footer-container">
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-section">
                            <h3 className="logo-footer h4 mb-3">TRAVEL V</h3>
                            <p className="mb-4">Website du lịch Việt Nam của chúng tôi cho phép bạn khám phá nhiều điểm đến và danh lam thắng cảnh trên khắp đất nước.
                                Mỗi địa điểm đều cung cấp các gói tour được tuyển chọn để bạn có thể lựa chọn trải nghiệm hoàn hảo cho chuyến đi của mình.
                                Bạn cũng có thể tùy chỉnh các tour này, điều chỉnh lịch trình và gói dịch vụ phù hợp với phong cách cá nhân của bạn.</p>
                            
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-section">
                            <h4 className="h4 mb-3 text-uppercase fw-bold" style={{ letterSpacing: "7px" }}>Bản tin của chúng tôi</h4>
                            <p className="mb-3">Đăng ký nhận bản tin để nhận tin tức mới nhất và ưu đãi đặc biệt từ chúng tôi.</p>
                            <div className="input-group mb-3" style={{ height: "50px" }}>
                                <input type="email"
                                    className="form-control bg-white border-1 text-black"
                                    placeholder="Nhập email của bạn"
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
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5 pt-4 border-top border-secondary">
                    <p className="mb-0">© 2026 Travel V. Bảo lưu mọi quyền.</p>
                </div>
            </div>
        </footer>
    </>)
}
export default MainFooter