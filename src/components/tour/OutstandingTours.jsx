import { useEffect, useState } from "react"
import api from "../../cores/axios";
import { toast } from "react-toastify";
import TourCard from "./TourCard";

export default function OutstandingTours({
    page = 1,
    row = 3,
    searchKeyword = ''
}) {
    const [tours, setTours] = useState([]);
    useEffect(() => {
        api.post('/v1/tours/get', {
            id: "",
            searchKeyword: searchKeyword,
            page: page,
            row: row
        }).then((res) => {
            setTours(res?.data?.data);
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [])
    return (<>
        <div className='outstanding-container'>
            <div className="outstanding-title"><p>Outstanding Tours</p></div>
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
            <div className='outstanding-cards'>
                {tours?.map((e, i) => {
                    return <TourCard
                        key={i}
                        title={e.title}
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
    </>)
}