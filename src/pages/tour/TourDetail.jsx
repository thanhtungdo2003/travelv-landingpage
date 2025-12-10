import { useEffect, useState } from "react";
import '../page.css'
import './style.css'
import Button from "../../components/ui/Button";
import { Bike, BrickWall, Car, ChevronDown, ChevronUp, Church, Clock, ClockFading, ConciergeBell, Earth, Group, Home, List, MapPinCheck, MapPinHouse, MapPinPen, Mountain, MoveRight, PersonStanding, Plane, ShoppingBag, User, Users, Volleyball } from "lucide-react";
import LocationCard from "../../components/location/LocationCard";
import TourCard from "../../components/tour/TourCard";
import TextField from "../../components/ui/TextField";
import MapPicker from "../../components/Map";
import { useNavigate, useParams } from "react-router-dom"
import api from "../../cores/axios";
import { toast } from "react-toastify";
import { formatDate, formatEstimatedTime } from "../../services/utils";
import OutstandingTours from "../../components/tour/OutstandingTours";
import ScheduleCalendar from "../../components/schedule/Schedule";
export default function TourDetail() {
    const nav = useNavigate();
    const { id } = useParams();
    const [thisTour, setThisTour] = useState(undefined)
    const [provinces, setProvince] = useState([])
    const [wards, setWards] = useState([])
    const [bookingsInfo, setBookingsInfo] = useState({
        province: '',
        ward: '',
        specific_address: '',
        diparture_at: formatDate(new Date()),
        pickup_lat: null,
        pickup_lng: null
    })
    const [statesInfo, setStatesInfo] = useState({
        priceInclude: false,
        priceNotInclude: false,
        paymentTerms: false,
        contacts: true,
    })
    const [desShow, showDes] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://provinces.open-api.vn/api/v2/?depth=2')
                const data = await res.json();
                setProvince(data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();

        api.post('/v1/tours/get', {
            id: id,
            searchKeyword: '',
            page: 1,
            row: 1
        }).then((res) => {
            setThisTour(res.data?.data[0])
        }).catch((err) => {
            toast.error(err?.status)
        });
    }, [])

    useEffect(() => {
        const province = provinces.find(e => e.codename == bookingsInfo.province)
        setWards(province?.wards)
    }, [bookingsInfo.province])

    return (<>
        <head><title>{`${thisTour?.title}`}</title></head>

        <div className="container-page">
            <div className="tour-page">
                <div className="tour-thumbnails">
                    <div className="main-thumbnail">
                        <img src={thisTour?.thumbnailURL} />
                    </div>
                    <div className="more-thumbnails">
                        <img src="../vanhoa1.jpg" />
                        <img src="../phongcanh1.jpg" />
                        <img src="../halong.jpg" />
                        <img src="../kientruc1.jpg" />
                    </div>
                </div>
                <div className="tour__content">
                    <div className="tour-info">
                        <div className="tour__title">
                            {thisTour?.title}
                        </div>
                        <div className="tour__description">
                            <div className={`tour-des-content ${desShow ? 'show' : 'hide'}`}>
                                <div dangerouslySetInnerHTML={{ __html: thisTour?.description }} />
                            </div>
                            <div className="tour-des-showmore-btn" onClick={() => {
                                showDes(!desShow);
                            }}>{!desShow ? <ChevronDown color="black" /> : <ChevronUp color="black" />}</div>
                        </div>
                        <div className="tour__options">
                            <div className="tour__option-start-location">
                                <label style={{ fontSize: 13, fontWeight: 550 }}>Start address</label>
                                <label>Province</label>
                                <select value={bookingsInfo.province} onChange={(e) => {
                                    setBookingsInfo({ ...bookingsInfo, province: e.target.value });
                                }}>
                                    <option >-- Choose your province --</option>
                                    {provinces.map((e) => {
                                        return <option value={e.codename}>{e.name}</option>
                                    })}
                                </select>
                                <label>Ward</label>
                                <select value={bookingsInfo.ward} onChange={(e) => {
                                    setBookingsInfo({ ...bookingsInfo, ward: e.target.value });
                                }}>
                                    <option >-- Choose your ward --</option>

                                    {wards?.map((e) => {
                                        return <option value={e.codename}>{e.name}</option>
                                    })}
                                </select><br /><br />
                                <TextField label={'Specific address'}
                                    placeholder={'Home number, lane number,...'}
                                    borderRadius={5}
                                    value={bookingsInfo.specific_address}
                                    onChange={(e) => {
                                        setBookingsInfo({ ...bookingsInfo, specific_address: e.target.value });
                                    }}
                                />
                                <div style={{}}>
                                    <label style={{}}>Chọn ngày khởi hành</label>
                                    <ScheduleCalendar
                                        schedules={thisTour?.schedules || []}
                                        selectedDate={selectedSchedule?.start_date}
                                        onChange={(schedule) => {
                                            const newSchedule = { ...schedule };
                                            const date = new Date(newSchedule.start_date);
                                            date.setDate(date.getDate() + 1);
                                            newSchedule.start_date = date.toISOString();
                                            setSelectedSchedule(newSchedule);
                                            setBookingsInfo((prev) => ({
                                                ...prev,
                                                diparture_at: newSchedule.start_date,
                                                schedule_id: newSchedule.id,
                                            }));
                                        }}

                                    />
                                </div>
                            </div>
                            <div className="tour__option-mappicker">
                                <label>Map picker (optional)</label>
                                <MapPicker />
                            </div>

                        </div>
                        <div className="tour__travel-itinerary-container">
                            <div className="travel-itinerarys">
                                <div className="travel-itinerary">
                                    <div class="tour__line-ver-item"></div>
                                    <div className="tour__line-hor-item"></div>
                                    <div className="travel-itinerary-content">
                                        <div className="travel-itinerary__desciption" onClick={(e) => {
                                            setStatesInfo({ ...statesInfo, priceInclude: !statesInfo.priceInclude })
                                        }}>Giá tour bao gồm {statesInfo.priceInclude ? <ChevronUp /> : <ChevronDown />}</div>
                                        <div className={`travel-itinerary__infos ${statesInfo.priceInclude ? 'show' : 'hide'}`}>
                                            <ul>
                                                <li>Xe tham quan (15, 25, 35, 45 chỗ tùy theo số lượng khách) theo chương trình</li>
                                                <li>Vé máy bay khứ hồi</li>
                                                <li>Khách sạn tương đương 3 & 4 sao theo tiêu chuẩn 2 khách/phòng hoặc 3 khách/phòng</li>
                                                <li>Các bữa ăn theo chương trình</li>
                                                <li>Vé tham quan theo chương trình</li>
                                                <li>Hướng dẫn viên tiếng Việt nối tuyến</li>
                                                <li>Bảo hiểm du lịch với mức bồi thường cao nhất 120.000.000đ/vụ</li>
                                                <li>Thuế VAT</li>
                                            </ul></div>
                                    </div>
                                </div>
                                <div className="travel-itinerary">
                                    <div class="tour__line-ver-item"></div>
                                    <div className="tour__line-hor-item"></div>
                                    <div className="travel-itinerary-content">
                                        <div className="travel-itinerary__desciption" onClick={(e) => {
                                            setStatesInfo({ ...statesInfo, priceNotInclude: !statesInfo.priceNotInclude })
                                        }}>Giá tour không bao gồm {statesInfo.priceNotInclude ? <ChevronUp /> : <ChevronDown />}</div>
                                        <div className={`travel-itinerary__infos ${statesInfo.priceNotInclude ? 'show' : 'hide'}`}><ul>
                                            <li>Chi phí cá nhân : ăn uống ngoài chương trình, giặt ủi, chi phí hủy đổi hành trình và nâng hạng chuyến bay, hành lý quá cước, phụ thu phòng đơn, …</li>
                                            <li>Tham quan ngoài chương trình</li>
                                        </ul></div>
                                    </div>
                                </div>
                                <div className="travel-itinerary">
                                    <div class="tour__line-ver-item"></div>
                                    <div className="tour__line-hor-item"></div>
                                    <div className="travel-itinerary-content">
                                        <div className="travel-itinerary__desciption" onClick={(e) => {
                                            setStatesInfo({ ...statesInfo, paymentTerms: !statesInfo.paymentTerms })
                                        }}>Thanh toán (Điều kiện) {statesInfo.paymentTerms ? <ChevronUp /> : <ChevronDown />}</div>
                                        <div className={`travel-itinerary__infos ${statesInfo.paymentTerms ? 'show' : 'hide'}`}><ul>
                                            <li>Khi đăng ký đặt cọc 50% số tiền tour</li>
                                            <li>Số tiền còn lại thanh toán hết trước ngày khởi hành 7-10 ngày (áp dụng tour ngày thường), trước ngày khởi hành 20-25 ngày (áp dụng tour lễ tết)</li>
                                        </ul></div>
                                    </div>
                                </div>
                                <div className="travel-itinerary">
                                    <div class="tour__line-ver-item"></div>
                                    <div className="tour__line-hor-item"></div>
                                    <div className="travel-itinerary-content">
                                        <div className="travel-itinerary__desciption" onClick={(e) => {
                                            setStatesInfo({ ...statesInfo, contacts: !statesInfo.contacts })
                                        }}>Liên Hệ {statesInfo.contacts ? <ChevronUp /> : <ChevronDown />}</div>
                                        <div className={`travel-itinerary__infos ${statesInfo.contacts ? 'show' : 'hide'}`}><ul>
                                            <li>HOTLine: 032885748327</li>
                                            <li>Tư vấn: 032885748327</li>
                                            <li>email: travelv.vn@gmail.com</li>
                                        </ul></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tour-summary-container">
                        <div className="summary__box">
                            <h2 style={{ borderBottom: '3px solid #dbdbdbff', padding: "4px" }}>Tour summary info</h2>
                            <div className="summary-infos">
                                <div>{thisTour?.vehicle == 'Car' ? <Car color="black" /> : <Plane color="black" />} Go by <strong>{thisTour?.vehicle}</strong></div>
                                <div><Clock color="black" /> Estimated time: <strong>{formatEstimatedTime(thisTour?.estimated_time)}</strong></div>
                                <div><Users color="black" /> Limited to <strong>{thisTour?.slots || 0}</strong> slots</div>
                                <div><MapPinHouse color="black" /> Depart from: <strong>{thisTour?.start_location}</strong></div>
                                <div><MapPinCheck color="black" /> First destination: <strong>{thisTour?.first_location}</strong></div>
                            </div>
                            <div className="summary-price">
                                <span>{Number(thisTour?.price).toLocaleString()}đ</span>/ <strong>Person</strong>
                            </div>
                            <div className="summary__btns">
                                <Button value={'Next to booking'}
                                    disable={
                                        bookingsInfo.specific_address == "" ||
                                        bookingsInfo.province == "" ||
                                        bookingsInfo.ward == "" ||
                                        !selectedSchedule
                                    }
                                    border={'1px solid #5e9cb8ff'}
                                    backgroundColor={'#ecececff'}
                                    iconRight={<MoveRight color="#5e9cb8ff" />}
                                    onClick={() => {
                                        nav(`/booking/${id}`, { state: bookingsInfo })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <OutstandingTours row={4} />
                </div>
            </div>
        </div>
    </>)
}