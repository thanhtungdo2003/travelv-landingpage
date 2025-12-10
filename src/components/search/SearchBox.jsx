import { Boxes, Loader2, Package, PackageOpen, Plus, Search } from "lucide-react";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import './style.css'
import ChipTag from "../ui/ChipTag";
import { toast } from "react-toastify";
import { use, useEffect, useState } from "react";
import api from "../../cores/axios";
export default function SearchBox({ onClose }) {
    const [tours, setTours] = useState();
    const [destinations, setDestinations] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedValue, setDebouncedValue] = useState(searchKeyword);
    const [loading, setLoading] = useState(false);
    const [searchHistorys, setSearchHistory] = useState([]);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchKeyword);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchKeyword])

    useEffect(() => {
        const rawHistorys = localStorage.getItem('search_historys');
        if (rawHistorys) {
            try {
                const historys = JSON.parse(rawHistorys);
                setSearchHistory(historys);
            } catch {
                localStorage.removeItem('search_historys');
            }
        }
    }, [])

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

    const addHistory = () => {
        if (searchKeyword != '') {
            const historys = JSON.parse(localStorage.getItem("search_historys")) || [];
            try {
                if (!historys.includes(searchKeyword)) {
                    if (historys.length > 15) {
                        historys.pop()
                        historys.unshift(searchKeyword);
                    } else {
                        historys.unshift(searchKeyword);
                    }
                    localStorage.setItem('search_historys', JSON.stringify(historys))
                    setSearchHistory([...searchHistorys, ...searchKeyword])
                }
            } catch {
                localStorage.removeItem('search_historys');
            }
        }
    }

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
                        maxLength={100}
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
                    {searchHistorys.map((e, i) => {
                        return (<ChipTag
                            backgroundColor="#3e77d3ff"
                            border="none"
                            color="white"
                            iconFill="white"
                            iconColor="#3267bcff"
                            title={e}
                            onClick={() => {
                                setSearchKeyword(e)
                            }}
                            onRemove={() => {
                                const rawHistorys = localStorage.getItem('search_historys');
                                if (rawHistorys) {
                                    try {
                                        const historys = JSON.parse(rawHistorys);
                                        const new_his = historys.filter(h => h != e);
                                        localStorage.setItem("search_historys", JSON.stringify(new_his))
                                        setSearchHistory(new_his);
                                    } catch {
                                        localStorage.removeItem('search_historys');
                                    }
                                }
                            }} />)
                    })}
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
                                        <a onClick={addHistory} href={`/travelv-landingpage/tour/${e.id}`} style={{ textDecoration: "none" }}>
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
                                            <a onClick={addHistory} href={`/travelv-landingpage/location/${e.id}`} style={{ textDecoration: "none" }}>
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