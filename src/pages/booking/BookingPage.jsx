import { ArrowLeft, CheckCircle, FormInput, Info, Minus, Plus, Wallet } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Button from "../../components/ui/Button";
import './style.css'
import '../page.css'
import BookingSummary from "./BookingSummary";
import TextField from "../../components/ui/TextField";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate, getPassDateByYear } from "../../services/utils";
import api from "../../cores/axios";
import { getTokenCookie } from "../../services/AccountService";

export default function BookingPage() {
    const location = useLocation();
    const [thisTour, setThisTour] = useState(undefined)
    const [roomsData, setRoomsData] = useState(null)
    const bookingsInfo = location.state;
    const { id } = useParams();
    const nav = useNavigate();

    const [bookingsData, setBookingsData] = useState({
        amountOfAdult: 1,
        amountOfChildren: 0,
        amountOfBaby: 0
    })
    const [bookingsForm, setBookingsForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        user_id: "",
        tour_id: "",
        province: "",
        ward: "",
        specific_address: "",
        selected_rooms: [],
        pickup_lat: null,
        pickup_lng: null,
        diparture_at: new Date().toISOString(),
        passengers: [
            {
                fullname: "",
                age_type: "Adult",
                birth_day: new Date().toISOString(),
            },
        ],
    })

    useEffect(() => {
        const account_id = window.localStorage.getItem('account_id');
        setBookingsForm({ ...bookingsForm, ...bookingsInfo, user_id: account_id, tour_id: id });
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
        api.post(`/v1/rooms/get-by-tour/${id}`, {}).then(res => {
            setRoomsData(res.data);
        }).catch(err => { })
    }, [])

    const increasePassenger = (type) => {
        const totalPassenger = Number(bookingsForm.passengers.length)
        if (totalPassenger == thisTour?.slots) {
            return toast.info('slot limit reached!')
        }
        if (type == 'Adult') {
            setBookingsForm(prev => ({
                ...prev,
                passengers: [...bookingsForm.passengers, {
                    fullname: "",
                    age_type: "Adult",
                    birth_day: undefined,
                }]
            }));
        } else if (type == 'Children') {
            setBookingsForm(prev => ({
                ...prev,
                passengers: [...bookingsForm.passengers, {
                    fullname: "",
                    age_type: "Children",
                    birth_day: undefined,
                }]
            }));
        } else if (type == 'Baby') {
            setBookingsForm(prev => ({
                ...prev,
                passengers: [...bookingsForm.passengers, {
                    fullname: "",
                    age_type: 'Baby',
                    birth_day: undefined,
                }]
            }));
        }
    }

    const decreasePassenger = (type) => {
        const totalPassenger = Number(bookingsForm.passengers.length)
        let agetype = '';
        if (totalPassenger == 1) {
            return toast.info('The total number of passengers cannot be zero!')
        }
        if (type == 'Adult') {
            if (bookingsForm.passengers.filter(p => p.age_type === "Adult").length == 0) {
                return toast.info('The number of this passengers cannot be negative!')
            }
            agetype = 'Adult';
        } else if (type == 'Children') {
            if (bookingsForm.passengers.filter(p => p.age_type === "Children").length == 0) {
                return toast.info('The number of this passengers cannot be negative!')
            }
            agetype = 'Children';
        } else if (type == 'Baby') {
            if (bookingsForm.passengers.filter(p => p.age_type === 'Baby').length == 0) {
                return toast.info('The number of this passengers cannot be negative!')
            }
            agetype = 'Baby';
        }
        setBookingsForm(prev => {
            const index = prev.passengers.findIndex(p => p.age_type === agetype);
            if (index === -1) return prev;
            return {
                ...prev,
                passengers: prev.passengers.filter((_, i) => i !== index),
            };
        });
    }
    const getPassDateByType = (type) => {
        switch (type) {
            case 'Adult':
                return { min: getPassDateByYear(100), max: getPassDateByYear(13) };
            case 'Children':
                return { min: getPassDateByYear(13), max: getPassDateByYear(3) };
            case 'Baby':
                return { min: getPassDateByYear(3), max: getPassDateByYear(0) };
        }
    }
    return (<>
        <head><title>{`Payment | ${thisTour?.title}`}</title></head>
        <div className="container-page">
            <div style={{ display: "flex" }}>
                <div style={{
                    position: "absolute"
                }}><Button value={'Back to detail'} backgroundColor={'transparent'} iconLeft={<ArrowLeft color="black" />} /></div>
                <h1 style={{ flex: 2, textAlign: "center" }}>TOUR BOOKING</h1>
            </div>
            <div className="booking-steps">
                <div className="b__step active">
                    <FormInput size={35} />
                    <span>Fill info</span>
                </div>
                <div className="b__step-line"></div>
                <div className="b__step">
                    <Wallet size={35} />
                    <span>Payment</span>
                </div>
                <div className="b__step-line"></div>
                <div className="b__step">
                    <CheckCircle size={35} />
                    <span>Done</span>
                </div>
            </div>
            <div className="booking-main-container">
                <div className="booking-main-info">
                    <div className="booking-info__contact">
                        <span>Contact infomations</span>
                        <div className="__contact-form">
                            <TextField label={'Fullname'} placeholder={'Your fullname'}
                                value={bookingsForm.fullname}
                                onChange={(e) => setBookingsForm({ ...bookingsForm, fullname: e.target.value })}
                            />
                            <div>
                                <label>Phone</label>
                                <PhoneInput
                                    country={'vn'}
                                    value={bookingsForm.phone}
                                    onChange={(value) => setBookingsForm({ ...bookingsForm, phone: value })}
                                    inputStyle={{ width: '100%' }}
                                />
                            </div>
                            <TextField label={'Email'} placeholder={'Your email, gmail'}
                                value={bookingsForm.email}
                                onChange={(e) => setBookingsForm({ ...bookingsForm, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="booking-info__passenger">
                        <span>Passengers</span>
                        <div className="__passenger-form">
                            <div className="__passenger-quantity-container">
                                <label>People 13 and up years old ({'>='} 13)</label>
                                <div className="__passenger-quantity-box">
                                    <Button iconLeft={<Minus color="#666" />} flex={1} onClick={() => decreasePassenger('Adult')} />
                                    <TextField border={'none'} flex={1} value={bookingsForm.passengers.filter(p => p.age_type === "Adult").length} textAlign="center" labelError={'none'} label={'none'} />
                                    <Button iconLeft={<Plus color="#666" />} flex={1} onClick={() => increasePassenger('Adult')} />
                                </div>
                            </div>
                            <div className="__passenger-quantity-container">
                                <label>People less than 13 and greater 3 years old ({'<'} 13 & {'>'}3)</label>
                                <div className="__passenger-quantity-box">
                                    <Button iconLeft={<Minus color="#666" />} flex={1} onClick={() => decreasePassenger('Children')} />
                                    <TextField border={'none'} flex={1} value={bookingsForm.passengers.filter(p => p.age_type === "Children").length} textAlign="center" labelError={'none'} label={'none'} />
                                    <Button iconLeft={<Plus color="#666" />} flex={1} onClick={() => increasePassenger('Children')} />
                                </div>
                            </div><div className="__passenger-quantity-container">
                                <label>People less than 3 years old ({'<'} 3)</label>
                                <div className="__passenger-quantity-box">
                                    <Button iconLeft={<Minus color="#666" />} flex={1} onClick={() => decreasePassenger('Baby')} />
                                    <TextField border={'none'} flex={1} value={bookingsForm.passengers.filter(p => p.age_type === 'Baby').length} textAlign="center" labelError={'none'} label={'none'} />
                                    <Button iconLeft={<Plus color="#666" />} flex={1} onClick={() => increasePassenger('Baby')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-info__passenger">
                        <span>Passengers info</span>
                        <div>
                            {bookingsForm.passengers.map((p, i) => (
                                <div key={i} className="__info__passenger-box">
                                    <div className="___index">{i}</div>
                                    <div className="___fullname"><TextField label={'Fullname'} border={'none'} placeholder={'Fullname of passenger'}
                                        value={p.fullname}
                                        onChange={(e) =>
                                            setBookingsForm(prev => ({
                                                ...prev,
                                                passengers: prev.passengers.map((passenger, idx) =>
                                                    idx === i
                                                        ? { ...passenger, fullname: e.target.value }
                                                        : passenger
                                                ),
                                            }))
                                        }
                                    /></div>
                                    <div className="___passenger-type">
                                        <select value={p.age_type}
                                            onChange={(e) =>
                                                setBookingsForm(prev => ({
                                                    ...prev,
                                                    passengers: prev.passengers.map((passenger, idx) =>
                                                        idx === i
                                                            ? { ...passenger, age_type: e.target.value }
                                                            : passenger
                                                    ),
                                                }))
                                            }
                                        >
                                            <option value={'Adult'}>Adult</option>
                                            <option value={'Children'}>Children</option>
                                            <option value={'Baby'}>Baby</option>
                                        </select>
                                    </div>
                                    <div><TextField type={'date'} min={getPassDateByType(p.age_type)?.min} max={getPassDateByType(p.age_type)?.max} label={'Birth day'} border={'none'}
                                        value={p.birth_day}
                                        onChange={(e) =>
                                            setBookingsForm(prev => ({
                                                ...prev,
                                                passengers: prev.passengers.map((passenger, idx) =>
                                                    idx === i
                                                        ? { ...passenger, birth_day: formatDate(e.target.value) }
                                                        : passenger
                                                ),
                                            }))
                                        }
                                    /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* --- ROOM SELECTION --- */}
                    <div className="booking-info__rooms">
                        <span>Select Rooms</span>
                        <div className="__rooms-list">
                            {roomsData?.data?.length > 0 ? (
                                roomsData?.data?.map((room, i) => (
                                    <div key={i} className="__room-item" onClick={() => {
                                        setBookingsForm(prev => {
                                            const updatedRooms = !bookingsForm.selected_rooms.includes(room.id)
                                                ? [...(prev.selected_rooms || []), room.id]
                                                : (prev.selected_rooms || []).filter(rid => rid !== room.id);
                                            return { ...prev, selected_rooms: updatedRooms };
                                        });
                                    }}>
                                        <div className="__room-info">
                                            <img
                                                src={room.thumbnailURL || '/default-room.jpg'}
                                                alt={room.title}
                                                className="__room-thumb"
                                            />
                                            <div className="__room-details">
                                                <h4>{room.title}</h4>
                                                <p>Type: {room.type}</p>
                                                <p style={{ color: "red" }}>Price: {room.price.toLocaleString()}₫</p>
                                                <p>Status: {room.status}</p>
                                            </div>
                                        </div>
                                        <div className="__room-select">
                                            <input
                                                type="checkbox"
                                                checked={bookingsForm.selected_rooms?.includes(room.id)}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#999', fontSize: 14 }}>No rooms available for this tour.</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="booking-main-summary-container">
                    <BookingSummary
                        amountOfAdult={bookingsForm.passengers.filter(p => p.age_type == 'Adult').length}
                        amountOfBaby={bookingsForm.passengers.filter(p => p.age_type == 'Baby').length}
                        amountOfChildren={bookingsForm.passengers.filter(p => p.age_type == 'Children').length}
                        tour={thisTour}
                        hasEmail={bookingsForm.email != ''}
                        hasPhone={bookingsForm.phone != ''}
                        hasName={bookingsForm.fullname != ''}
                        onCheckOut={() => {
                            console.log(bookingsForm)
                            api.post('/v1/bookings/create', bookingsForm, {
                                headers: {
                                    Authorization: `Bearer ${getTokenCookie()}`
                                }
                            }).then((res) => {
                                if (res?.data?.id) {
                                    nav(`/payment/${res?.data?.id}`)
                                }
                            }).catch((err) => {
                                toast.error(err.status)
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    </>)
}
