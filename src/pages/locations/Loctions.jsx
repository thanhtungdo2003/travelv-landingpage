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
    const [categoryName, setCategoryName] = useState('GREAT DESTINATIONS');
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