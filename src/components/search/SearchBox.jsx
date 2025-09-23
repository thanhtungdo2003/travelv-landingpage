import { Boxes, Loader2, Package, PackageOpen, Plus, Search } from "lucide-react";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import './style.css'
import ChipTag from "../ui/ChipTag";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../cores/axios";
export default function SearchBox({ onClose }) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [tours, setTours] = useState();
    const [destinations, setDestinations] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState(searchKeyword);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchKeyword);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchKeyword])

    useEffect(() => {
        if (debouncedValue) {
            api.post('/v1/tours/get', {
                id: "",
                searchKeyword: searchKeyword,
                page: 1,
                row: 5
            }).then((res) => {
                setTours(res?.data?.data);
            }).catch((err) => {
                toast.error(err?.status)
            }).finally(() => {
                setLoading(false);

            })
            api.post('/v1/destinations/get', {
                id: "",
                searchKeyword: searchKeyword,
                page: 1,
                row: 5
            }).then((res) => {
                setDestinations(res?.data?.data);
            }).catch((err) => {
                toast.error(err?.status)
            }).finally(() => {
                setLoading(false);

            })
        }
    }, [debouncedValue])
    return (<>
        <div className="search-box-container" onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className="search-box-main-form">
                <div className="__search-box">
                    <div className="___icon">
                        <Search color="#5a5a5aff" />
                    </div>
                    <TextField
                        placeholder={'What are you looking for?'}
                        border={'none'}
                        value={searchKeyword}
                        onChange={(e) => {
                            setLoading(true);

                            setSearchKeyword(e.target.value)
                        }}
                    />
                    <Button
                        value={'Search'}
                    />
                </div>
                <div className="chip-tags">
                    <ChipTag title={'Du lịch Hạ Long'} onRemove={() => { }} />
                    <ChipTag title={'Du lịch Đà Nẵng'} onRemove={() => { }} />
                    <ChipTag title={'Du Lịch Miền Nam'} onRemove={() => { }} />
                    <ChipTag title={'Du Lịch Miền Bắc'} onRemove={() => { }} />
                    <ChipTag title={'Tour 4 người'} onRemove={() => { }} />
                    <ChipTag title={'Tour 2 người'} onRemove={() => { }} />
                    <ChipTag title={'Tour gia đình'} onRemove={() => { }} />
                    <ChipTag title={'Khuyến mại'} onRemove={() => { }} />
                </div>
                <div className="results-boxs">
                    <div className="__tours">
                        {loading ? <>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                padding: "40px"
                            }}>
                                <Plus color="black" size={40} className="loader" />
                            </div>
                        </> : <></>}
                        {tours?.length == 0 && !loading ? <>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                padding: "40px"
                            }}>
                                <PackageOpen size={50} strokeWidth={0.6} color="#777" />
                                No results found for "{searchKeyword}"
                            </div></> :
                            <>
                                {tours?.map((e, i) => {
                                    return (<>
                                        <a href={`/tour/${e.id}`} style={{ textDecoration: "none" }}>
                                            <div className="result-item">
                                                <img src={e.thumbnailURL} />
                                                <div className="result-item-content">
                                                    <div className="result-item-main">
                                                        <div className="___title"><strong style={{ fontSize: "16px" }}>{e.title}</strong></div>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px" }}><div className="___price">{Number(e.price).toLocaleString()} VND</div> / Person</div>
                                                    </div>
                                                    <div className="result-item-footer">
                                                        <div style={{ fontSize: "12px" }}>Tour</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </a>
                                    </>)
                                })}
                                {
                                    destinations?.map((e, i) => {
                                        return (<>
                                            <a href={`/location/${e.id}`} style={{ textDecoration: "none" }}>
                                                <div className="result-item">
                                                    <img src={e.thumbnailURL} />
                                                    <div className="result-item-content">
                                                        <div className="result-item-main">
                                                            <div className="___title"><strong style={{ fontSize: "16px" }}>{e.title}</strong></div>
                                                        </div>
                                                        <div className="result-item-footer">
                                                            <div style={{ fontSize: "12px" }}>Destiantion</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </a>
                                        </>)
                                    })
                                }
                            </>

                        }
                    </div>
                    <div className="__destinations">

                    </div>
                </div>
            </div>
        </div>
    </>)
}