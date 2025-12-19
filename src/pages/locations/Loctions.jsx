import { useEffect, useState } from "react";
import '../page.css'
import './style.css'
import Button from "../../components/ui/Button";
import { Bike, BrickWall, Church, ClockFading, ConciergeBell, Home, List, Mountain, PersonStanding, ShoppingBag, Volleyball } from "lucide-react";
import LocationCard from "../../components/location/LocationCard";
import api from "../../cores/axios";
import { toast } from "react-toastify";
import OutstandingTours from "../../components/tour/OutstandingTours";
import PageInput from "../../components/ui/PageInput";
export default function LocationsPage() {
    const [categoryName, setCategoryName] = useState('ĐIỂM ĐẾN TUYỆT VỜI');
    const [categoryImage, setCategoryImage] = useState('./langbac-about.jpg');
    const [newDestinations, setNewDestinations] = useState(undefined);
    const [filter, setFilter] = useState({
        id: "",
        searchKeyword: "",
        page: 1,
        row: 8
    })
    useEffect(() => {
        api.post('/v1/destinations/get', filter).then((res) => {
            setNewDestinations(res?.data);
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [filter])
    return (<>
        <div className="container-page">
            <div className="locations-page">
                <div className="categories-box">
                    <div className="categories">
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('ĐIỂM ĐẾN TUYỆT VỜI');
                            setCategoryImage('./langbac-about.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><List size={40} /></div>
                                <div className="category-name">Tất cả</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('DANH THẮNG');
                            setCategoryImage('./halong-about.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Mountain size={40} /></div>
                                <div className="category-name">Danh thắng</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('LỄ HỘI');
                            setCategoryImage('./lehoi1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><PersonStanding size={40} /></div>
                                <div className="category-name">Lễ hội</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('LỊCH SỬ');
                            setCategoryImage('lichsu.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><ClockFading size={40} /></div>
                                <div className="category-name">Lịch sử</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('KIẾN TRÚC');
                            setCategoryImage('kientruc1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><BrickWall size={40} /></div>
                                <div className="category-name">Kiến trúc</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('HOẠT ĐỘNG TRẢI NGHIỆM');
                            setCategoryImage('hoatdong1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Bike size={40} /></div>
                                <div className="category-name">Hoạt động trải nghiệm</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('ẨM THỰC');
                            setCategoryImage('amthuc1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><ConciergeBell size={40} /></div>
                                <div className="category-name">Ẩm thực</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('VĂN HÓA');
                            setCategoryImage('vanhoa1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Church size={40} /></div>
                                <div className="category-name">Văn hóa</div>
                            </div>
                        </div>
                    </div>
                    <div className="category-choosed-name">
                        <h1>{categoryName}</h1>
                        <span>Trải nghiệm văn hóa, kiến trúc, ẩm thực và nhiều hơn thế nữa</span>
                    </div>
                    <div className="categories-image">
                        <img src={categoryImage} />
                    </div>
                </div>
                <div className="outstanding-box">
                    <div className="box-header">
                        <div className="box-title">Địa điểm được đề xuất cho bạn</div>
                        <div className='sorted'>
                            <label>Sắp xếp theo</label>
                            <div>
                                <select>
                                    <option>Ngày</option>
                                    <option>Tháng</option>
                                    <option>Năm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="box-items">
                        {newDestinations?.data.map((e, i) => {
                            return <LocationCard title={e.title}
                                description={e.description}
                                imageSrc={e.thumbnailURL}
                                location={e.destination_id}
                                vehicle={e.vehicle}
                                price={e.price}
                                views={e.views}
                                segment={e.tag}
                                tourAmount={1}
                                time={e.estimated_time}
                                id={e.id}
                            />
                        })}
                    </div>

                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <PageInput page={1} onChange={(value) => {
                        setFilter(prev => ({ ...prev, page: value }))
                    }}
                        max={newDestinations?.max_page}
                    />
                </div>
                <div>
                    <OutstandingTours row={3} />
                </div>
            </div>
        </div>
    </>)
}