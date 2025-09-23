import { useEffect, useState } from "react"
import api from "../../cores/axios";
import { toast } from "react-toastify";
import LocationCard from "./LocationCard";

export default function OutstandingDestinations({
    page = 1,
    row = 3,
    searchKeyword = ''
}) {
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        api.post('/v1/destinations/get', {
            id: "",
            searchKeyword: searchKeyword,
            page: page,
            row: row
        }).then((res) => {
            setDestinations(res?.data?.data);
        }).catch((err) => {
            toast.error(err?.status)
        })
    }, [])
    return (<>
        <div className='outstanding-container'>
            <div className='outstanding-sorted'>
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
                {destinations?.map((e, i) => {
                    return <LocationCard title={e.title}
                        key={i}
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
    </>)
}