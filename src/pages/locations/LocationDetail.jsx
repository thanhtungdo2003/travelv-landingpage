import { useEffect, useState } from "react";
import '../page.css'
import './style.css'
import Button from "../../components/ui/Button";
import { Bike, BrickWall, Church, ClockFading, ConciergeBell, Earth, Group, Home, List, MapPinPen, Mountain, PersonStanding, ShoppingBag, User, Users, Volleyball } from "lucide-react";
import LocationCard from "../../components/location/LocationCard";
import TourCard from "../../components/tour/TourCard";
import TextField from "../../components/ui/TextField";
import api from "../../cores/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function LocationDetail() {
    const { id } = useParams();
    const [tours, setTours] = useState(undefined);

    const [destination, setDestination] = useState(undefined)
    const [filterData, setFilterData] = useState({
        finance: 1,
        from: 'default',
        to: 'default',
        depatureDate: new Date().toISOString().split('T')[0],
    });
    const [provinces, setProvince] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://provinces.open-api.vn/api/v2/?depth=2')
            const data = await res.json();
            setProvince(data.map(p => { return { name: p.name, codename: p.codename } }));
        }
        fetchData();

        api.post('/v1/destinations/get', {
            id: id,
            searchKeyword: '',
            page: 1,
            row: 1
        }).then((res) => {
            setDestination(res.data?.data[0])
        }).catch((err) => {
            toast.error(err?.status)
        });

        api.post('/v1/tours/get', {
            id: '',
            searchKeyword: '',
            page: 1,
            row: 10
        }).then((res) => {
            setTours(res.data?.data)
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [])
    return (<>
        <div className="container-page">
            <div className="locations-page">
                <div className="location-image-box">
                    <div className="category-choosed-name">
                        <h1>{destination?.title || "VIET NAM"}</h1>
                        <span>Experience culture, architecture, cuisine and so much more</span>
                    </div>
                    <div>
                        <img src={destination?.thumbnailURL} />
                    </div>
                </div>
                <div className="tour-cate-slide-container">
                    <div className="tour-categories">
                        <div className="category-checkbox">
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Users size={40} /></div>
                                <div className="category-name">Group tour</div>
                            </div>
                        </div>
                        <div className="category-checkbox">
                            <div className="category-checkbox-content">
                                <div className="category-icon"><User size={40} /></div>
                                <div className="category-name">Private tour</div>
                            </div>
                        </div>
                        <div className="category-checkbox">
                            <div className="category-checkbox-content">
                                <div className="category-icon"><MapPinPen size={40} /></div>
                                <div className="category-name">Free & Easy</div>
                            </div>
                        </div>
                        <div className="category-checkbox">
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Earth size={40} /></div>
                                <div className="category-name">Package tour</div>
                            </div>
                        </div>

                    </div>

                    <div className="tour-cate-slide">
                        <img src="/shopping1.jpg" />
                    </div>
                </div>

                <div className="main-contents-box">
                    <div className='filter-container'>
                        <div className="filter-box">
                            <label className="name-of-box">Filter</label>
                            <div className="filter-options">
                                <div className="option-label">Finance</div>
                                <div className="filter-option-elements">
                                    <Button value={'From 1000.000đ to 5000.000đ'}
                                        border={'1px solid #CCC'}
                                    />
                                    <Button value={'From 5000.000đ to 10.000.000đ'}
                                        border={'1px solid #CCC'}
                                    />
                                    <Button value={'From 10.000.000đ to 15.000.000đ'}
                                        border={'1px solid #CCC'}
                                    />
                                    <Button value={'From 15.000.000đ to 20.000.000đ'}
                                        border={'1px solid #CCC'}
                                    />
                                    <Button value={'From 25.000.000đ to 30.000.000đ'}
                                        border={'1px solid #CCC'}
                                    />
                                    <Button value={'Over 30.000.000đ'}
                                        border={'1px solid #CCC'}
                                    />
                                </div>
                            </div>
                            <div className="filter-options">
                                <div className="option-label">From</div>
                                <div className="filter-option-elements">
                                    <select>
                                        <option value={'default'}>Default</option>
                                        {provinces.map((e) => {
                                            return <option value={e.codename}>{e.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="option-label">To</div>
                                <div className="filter-option-elements">
                                    <select>
                                        <option value={'default'}>Default</option>
                                        {provinces.map((e) => {
                                            return <option value={e.codename}>{e.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="filter-options">
                                <div className="filter-option-elements">
                                    <TextField min={(new Date().toISOString().split('T')[0])} type={'date'} label={'Departure date'}
                                        value={filterData.depatureDate}
                                        onChange={(e) => setFilterData({ ...filterData, depatureDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="filter-options">
                                <div className="filter-btns">
                                    <Button value={'Clear'} color={'red'} />
                                    <Button value={'Apply'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="box-header">
                            <div className="box-title">Tour recommended for you</div>
                        </div>
                        <div className="box-items" style={{ gridTemplateColumns: "auto auto" }}>
                            {tours?.map((e, i) => {
                                return <TourCard title={e.title}
                                    description={e.description}
                                    imageSrc={e.thumbnailURL}
                                    location={e.destination.title}
                                    vehicle={e.vehicle}
                                    price={e.price}
                                    views={e.views}
                                    segment={e.tag}
                                    time={e.estimated_time}
                                    id={e.id}
                                />
                            })}
                        </div>
                    </div>
                </div>
                <div className="destination__description-box">
                    <div className='destination__description'>
                        <label htmlFor="" className='___title'>Descriptions</label>
                        <div dangerouslySetInnerHTML={{ __html: destination?.description }} />
                    </div>
                    <div className='destination__comments'>
                        <label htmlFor="" className='___title'>Comments</label>
                    </div>
                </div>
                <div className="outstanding-box">
                    <div className="box-header">
                        <div className="box-title">Locations Outstanding</div>
                        <div className='sorted'>
                            <label>Sort by</label>
                            <select>
                                <option>Date</option>
                                <option>Month</option>
                                <option>Year</option>
                            </select>
                        </div>
                    </div>
                    <div className="box-items">
                        <LocationCard title={'Ha Long'}
                            description={'3 vé trải nghiệm dịch vụ đẳng cấp tại Vịnh Hạ Long'}
                            imageSrc={'/halong.jpg'}
                            tourAmount={3}
                            views={3456546}
                        />
                        <LocationCard title={'Lang Ho Chu Tich'}
                            description={'Viếng thăm lăng Bác là một trong những hoạt động cần thiết nhất khi đến với Hà Nội'}
                            imageSrc={'/langbac-about.jpg'}
                            tourAmount={3}
                            views={7324234}

                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'/bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}
                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'/bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}

                        />
                    </div>
                </div>
            </div>
        </div>
    </>)
}