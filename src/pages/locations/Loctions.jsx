import { useEffect, useState } from "react";
import '../page.css'
import './style.css'
import Button from "../../components/ui/Button";
import { Bike, BrickWall, Church, ClockFading, ConciergeBell, Home, List, Mountain, PersonStanding, ShoppingBag, Volleyball } from "lucide-react";
import LocationCard from "../../components/location/LocationCard";
import api from "../../cores/axios";
import { toast } from "react-toastify";
export default function LocationsPage() {
    const [categoryName, setCategoryName] = useState('GREAT DESTINATIONS');
    const [categoryImage, setCategoryImage] = useState('./langbac-about.jpg');
    const [newDestinations, setNewDestinations] = useState(undefined);
    useEffect(() => {
        api.post('/v1/destinations/get', {
            id: "",
            searchKeyword: "",
            page: 1,
            row: 8
        }).then((res) => {
            setNewDestinations(res?.data?.data);
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [])
    return (<>
        <div className="container-page">
            <div className="locations-page">
                <div className="categories-box">
                    <div className="categories">
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('GREAT DESTINATIONS');
                            setCategoryImage('./langbac-about.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><List size={40} /></div>
                                <div className="category-name">All</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('SCENIC SPOT');
                            setCategoryImage('./halong-about.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Mountain size={40} /></div>
                                <div className="category-name">Scenic Spot</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('FESTIVAL');
                            setCategoryImage('./lehoi1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><PersonStanding size={40} /></div>
                                <div className="category-name">Festival</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('HISTORY');
                            setCategoryImage('lichsu.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><ClockFading size={40} /></div>
                                <div className="category-name">History</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('Architeture');
                            setCategoryImage('kientruc1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><BrickWall size={40} /></div>
                                <div className="category-name">Architecture</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('EXPERIENTIAL ACTIVITES');
                            setCategoryImage('hoatdong1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Bike size={40} /></div>
                                <div className="category-name">Experiential activities</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('CUISINE');
                            setCategoryImage('amthuc1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><ConciergeBell size={40} /></div>
                                <div className="category-name">Cuisine</div>
                            </div>
                        </div>
                        <div className="category-checkbox" onClick={() => {
                            setCategoryName('CULTURE');
                            setCategoryImage('vanhoa1.jpg')
                        }}>
                            <div className="category-checkbox-content">
                                <div className="category-icon"><Church size={40} /></div>
                                <div className="category-name">Culture</div>
                            </div>
                        </div>
                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" >
                        <clipPath id="categories-image-clippath" clipPathUnits="userSpaceOnUse">
                            <path d="
                                M 383.696 88.7592
                                C 326.696 100.057 403.696 -24.4023 235.696 99.9044
                                C 67.696 224.211 226.696 266.136 149.696 328.323
                                C 72.696 390.511 154.696 472.661 211.696 460.633
                                C 268.696 448.604 452.696 580.803 450.696 487.696
                                C 448.696 394.588 645.696 546.703 662.696 451.48
                                C 679.696 356.258 735.696 381.373 738.696 238.038
                                C 741.696 94.703 721.696 -2.20564 583.696 87.9442
                                C 445.696 178.094 460.696 71.7077 498.696 69.7288
                                C 536.696 67.7499 463.696 38.8037 424 59.074
                                Z
                                " />
                        </clipPath>
                        <rect clip-path="url(#customShape)" />
                    </svg> */}
                    <div className="category-choosed-name">
                        <h1>{categoryName}</h1>
                        <span>Experience culture, architecture, cuisine and so much more</span>
                    </div>
                    <div className="categories-image">
                        <img src={categoryImage} />
                    </div>
                </div>
                <div className="outstanding-box">
                    <div className="box-header">
                        <div className="box-title">Locations recommended for you</div>
                        <div className='sorted'>
                            <label>Sort by</label>
                            <div>
                                <select>
                                    <option>Date</option>
                                    <option>Month</option>
                                    <option>Year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="box-items">
                        {newDestinations?.map((e, i) => {
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
                            imageSrc={'./halong.jpg'}
                            tourAmount={3}
                            views={3456546}
                        />
                        <LocationCard title={'Lang Ho Chu Tich'}
                            description={'Viếng thăm lăng Bác là một trong những hoạt động cần thiết nhất khi đến với Hà Nội'}
                            imageSrc={'./langbac-about.jpg'}
                            tourAmount={3}
                            views={7324234}

                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'./bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}
                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'./bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}

                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'./bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}

                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'./bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}

                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'./bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}

                        />
                        <LocationCard title={'Bac Son'}
                            description={'Dịch vụ đẳng cấp cùng trải nghiệm mới mẻ và cảm giác hòa mình cùng thiên nhiên, cuộc sống bình dị tại Bắc Sơn, được đắm chìm vào phong cảnh hùng vĩ nhưng đầy thơ mộng được dệt nên bởi những thuở rộng bậc thang, và cánh cò trắng muốt'}
                            imageSrc={'./bacson-about.jpg'}
                            tourAmount={3}
                            views={324234}

                        />
                    </div>
                </div>
            </div>
        </div>
    </>)
}