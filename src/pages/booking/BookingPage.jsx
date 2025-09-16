import { ArrowLeft, CheckCircle, FormInput, Info, Minus, Plus, Wallet } from "lucide-react";
import { useLocation, useParams } from "react-router-dom"
import Button from "../../components/ui/Button";
import './style.css'
import '../page.css'
import BookingSummary from "./BookingSummary";
import TextField from "../../components/ui/TextField";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPassDateByYear } from "../../services/utils";
import api from "../../cores/axios";

export default function BookingPage() {
    const location = useLocation();
    const [thisTour, setThisTour] = useState(undefined)
    const bookingsInfo = location.state;
    const { id } = useParams();

    const [bookingsData, setBookingsData] = useState({
        email: '',
        phone: '',
        fullname: '',
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
        pickup_lat: null,
        pickup_lng: null,
        diparture_at: new Date().toISOString(),
        passengers: [
            {
                fullname: "",
                age_type: "",
                bookings_id: "",
                birth_day: new Date().toISOString(),
            },
        ],
    })

    useEffect(() => {
        console.log(bookingsInfo)
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

    const increasePassenger = (type) => {
        const totalPassenger = Number(bookingsData.amountOfAdult) + Number(bookingsData.amountOfChildren) + Number(bookingsData.amountOfBaby)
        if (totalPassenger == thisTour?.slots) {
            return toast.info('slot limit reached!')
        }
        if (type == 'adult') {
            setBookingsData(prev => ({
                ...prev,
                amountOfAdult: prev.amountOfAdult + 1
            }));
        } else if (type == 'children') {
            setBookingsData(prev => ({
                ...prev,
                amountOfChildren: prev.amountOfChildren + 1
            }));
        } else if (type == 'baby') {
            setBookingsData(prev => ({
                ...prev,
                amountOfBaby: prev.amountOfBaby + 1
            }));
        }
    }

    const decreasePassenger = (type) => {
        const totalPassenger = Number(bookingsData.amountOfAdult) + Number(bookingsData.amountOfChildren) + Number(bookingsData.amountOfBaby)
        if (totalPassenger == 1) {
            return toast.info('The total number of passengers cannot be zero!')
        }
        if (type == 'adult') {
            if (bookingsData.amountOfAdult == 0) {
                return toast.info('The number of this passengers cannot be negative!')
            }
            setBookingsData(prev => ({
                ...prev,
                amountOfAdult: prev.amountOfAdult - 1
            }));
        } else if (type == 'children') {
            if (bookingsData.amountOfChildren == 0) {
                return toast.info('The number of this passengers cannot be negative!')
            }
            setBookingsData(prev => ({
                ...prev,
                amountOfChildren: prev.amountOfChildren - 1
            }));
        } else if (type == 'baby') {
            if (bookingsData.amountOfBaby == 0) {
                return toast.info('The number of this passengers cannot be negative!')
            }
            setBookingsData(prev => ({
                ...prev,
                amountOfBaby: prev.amountOfBaby - 1
            }));
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
                                    <Button iconLeft={<Minus color="#666" />} flex={1} onClick={() => decreasePassenger('adult')} />
                                    <TextField border={'none'} flex={1} value={bookingsData.amountOfAdult} textAlign="center" labelError={'none'} label={'none'} />
                                    <Button iconLeft={<Plus color="#666" />} flex={1} onClick={() => increasePassenger('adult')} />
                                </div>
                            </div>
                            <div className="__passenger-quantity-container">
                                <label>People less than 13 and greater 3 years old ({'<'} 13 & {'>'}3)</label>
                                <div className="__passenger-quantity-box">
                                    <Button iconLeft={<Minus color="#666" />} flex={1} onClick={() => decreasePassenger('children')} />
                                    <TextField border={'none'} flex={1} value={bookingsData.amountOfChildren} textAlign="center" labelError={'none'} label={'none'} />
                                    <Button iconLeft={<Plus color="#666" />} flex={1} onClick={() => increasePassenger('children')} />
                                </div>
                            </div><div className="__passenger-quantity-container">
                                <label>People less than 3 years old ({'<'} 3)</label>
                                <div className="__passenger-quantity-box">
                                    <Button iconLeft={<Minus color="#666" />} flex={1} onClick={() => decreasePassenger('baby')} />
                                    <TextField border={'none'} flex={1} value={bookingsData.amountOfBaby} textAlign="center" labelError={'none'} label={'none'} />
                                    <Button iconLeft={<Plus color="#666" />} flex={1} onClick={() => increasePassenger('baby')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-info__passenger">
                        <span>Passengers info</span>
                        <div>
                            {bookingsData.amountOfAdult > 0 ? <label><strong>Peoples 13 and up years old ({'>='} 13)</strong></label> : <></>}
                            {[...Array(bookingsData.amountOfAdult)].map((_, i) => (
                                <div key={i} className="__info__passenger-box">
                                    <div className="___index">{i}</div>
                                    <div className="___fullname"><TextField label={'Fullname'} border={'none'} placeholder={'Fullname of passenger'} /></div>
                                    <div><TextField type={'date'} max={getPassDateByYear(13)} label={'Birth day'} border={'none'} /></div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {bookingsData.amountOfChildren > 0 ? <label><strong>Peoples less than 13 and greater 3 years old ({'<'} 13 & {'>'}3)</strong></label> : <></>}
                            {[...Array(bookingsData.amountOfChildren)].map((_, i) => (
                                <div key={i} className="__info__passenger-box">
                                    <div className="___index">{i}</div>
                                    <div className="___fullname"><TextField label={'Fullname'} border={'none'} placeholder={'Fullname of passenger'} /></div>
                                    <div><TextField type={'date'} max={getPassDateByYear(3)} min={getPassDateByYear(13)} label={'Birth day'} border={'none'} /></div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {bookingsData.amountOfBaby > 0 ? <label><strong>Peoples less than 3 years old ({'<'} 3)</strong></label> : <></>}
                            {[...Array(bookingsData.amountOfBaby)].map((_, i) => (
                                <div key={i} className="__info__passenger-box">
                                    <div className="___index">{i}</div>
                                    <div className="___fullname"><TextField label={'Fullname'} border={'none'} placeholder={'Fullname of passenger'} /></div>
                                    <div><TextField type={'date'} max={getPassDateByYear(0)} min={getPassDateByYear(3)} label={'Birth day'} border={'none'} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="booking-main-summary-container">
                    <BookingSummary
                        amountOfAdult={bookingsData.amountOfAdult}
                        amountOfBaby={bookingsData.amountOfBaby}
                        amountOfChildren={bookingsData.amountOfChildren}
                        tour={thisTour}
                    />
                </div>
            </div>
        </div>
    </>)
}
