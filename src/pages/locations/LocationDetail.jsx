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
import OutstandingTours from "../../components/tour/OutstandingTours";
import PageInput from "../../components/ui/PageInput";
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
    const [filterTours, setFilterTours] = useState({
        page: 1,
        row: 4,
        searchKeyword: '',
        id: '',
        priceFrom: 0,
        priceTo: 1000000000
    });
    const [priceFilterIndex, setPriceFilterIndex] = useState(null);

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


    }, [])
    useEffect(() => {
        api.post(`/v1/tours/get-by-destination/${id}`, filterTours).then((res) => {
            setTours(res.data)
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [filterTours, filterData])
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
                                        border={priceFilterIndex == 0 ? '2px solid #4f9dd1ff' : '1px solid #CCC'}
                                        onClick={() => {
                                            setFilterTours({ ...filterTours, priceFrom: 1000000, priceTo: 5000000 });
                                            setPriceFilterIndex(0);
                                        }}
                                    />
                                    <Button value={'From 5000.000đ to 10.000.000đ'}
                                        border={priceFilterIndex == 1 ? '2px solid #4f9dd1ff' : '1px solid #CCC'}
                                        onClick={() => {
                                            setFilterTours({ ...filterTours, priceFrom: 5000000, priceTo: 10000000 });
                                            setPriceFilterIndex(1);
                                        }}
                                    />
                                    <Button value={'From 10.000.000đ to 15.000.000đ'}
                                        border={priceFilterIndex == 2 ? '2px solid #4f9dd1ff' : '1px solid #CCC'}
                                        onClick={() => {
                                            setFilterTours({ ...filterTours, priceFrom: 10000000, priceTo: 15000000 });
                                            setPriceFilterIndex(2);
                                        }}
                                    />
                                    <Button value={'From 15.000.000đ to 20.000.000đ'}
                                        border={priceFilterIndex == 3 ? '2px solid #4f9dd1ff' : '1px solid #CCC'}
                                        onClick={() => {
                                            setFilterTours({ ...filterTours, priceFrom: 15000000, priceTo: 20000000 });
                                            setPriceFilterIndex(3);
                                        }}
                                    />
                                    <Button value={'From 25.000.000đ to 30.000.000đ'}
                                        border={priceFilterIndex == 4 ? '2px solid #4f9dd1ff' : '1px solid #CCC'}
                                        onClick={() => {
                                            setFilterTours({ ...filterTours, priceFrom: 25000000, priceTo: 30000000 });
                                            setPriceFilterIndex(4);
                                        }}
                                    />
                                    <Button value={'Over 30.000.000đ'}
                                        border={priceFilterIndex == 5 ? '2px solid #4f9dd1ff' : '1px solid #CCC'}
                                        onClick={() => {
                                            setFilterTours({ ...filterTours, priceFrom: 30000000, priceTo: 1000000000 });
                                            setPriceFilterIndex(5);
                                        }}
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
                                    <Button value={'Clear'} color={'red'} onClick={() => {
                                        setFilterTours({ ...filterTours, priceFrom: 0, priceTo: 1000000000 });
                                        setPriceFilterIndex(undefined)
                                    }} />
                                    <Button value={'Apply'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="box-header">
                            <div className="box-title">Tour recommended for you</div>
                        </div>
                        <div className="box-items" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                            {tours?.data?.map((e, i) => {
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

                        <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                            <PageInput page={1} onChange={(value) => {
                                setFilterTours(prev => ({ ...prev, page: value }))
                            }}
                                max={tours?.max_page}
                            />
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
                <div style={{ width: "100%" }}>
                    <OutstandingTours row={4} />
                </div>
            </div>
        </div>
    </>)
}