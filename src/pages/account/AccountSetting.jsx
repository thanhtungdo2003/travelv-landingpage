import React, { use, useEffect, useState } from 'react';
import './style.css';
import { Bell, Earth, Link2, List, Lock, LogOut, Shield, User } from 'lucide-react';
import { getTokenCookie, logout } from '../../services/AccountService';
import { useNavigate } from 'react-router-dom';
import api from '../../cores/axios';
import { toast } from 'react-toastify';
import { formatDate, formatEstimatedTime } from '../../services/utils';
import Button from '../../components/ui/Button';

const PersonalInfo = () => {
    const nav = useNavigate();
    const [activeSection, setActiveSection] = useState('profile');
    const [bookings, setBookings] = useState(undefined)
    const [booking, setBooking] = useState(undefined)
    const [province, setProvince] = useState(undefined)
    const [showPassengerID, setShowPassengerID] = useState(undefined)
    const [bookingsFilters, setBookingsFilters] = useState({
        id: "",
        searchKeyword: "",
        page: 1,
        row: 10
    })
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://provinces.open-api.vn/api/v2/?depth=2')
            const data = await res.json();
            setProvince(data);
        }
        fetchData();
    }, [])
    useEffect(() => {
        api.post('/v1/bookings/user', bookingsFilters, {
            headers: {
                Authorization: `Bearer ${getTokenCookie()}`
            }
        }).then((res) => {
            setBookings(res?.data)
        }).catch((err) => {
            toast.error(err?.status)
            nav('/')
        })
    }, [bookingsFilters])
    useEffect(() => {
        setBooking(bookings?.data?.find(b => b.id == showPassengerID));
    }, [showPassengerID])

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: <User /> },
        { id: 'orders', label: 'your orders', icon: <List /> },
        { id: 'security', label: 'Security', icon: <Lock /> },
        { id: 'privacy', label: 'Privacy', icon: <Shield /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell /> },
        { id: 'language', label: 'Language', icon: <Earth /> },
        { id: 'logout', label: 'Log out', icon: <LogOut /> },
    ];

    const handleMenuClick = (itemId) => {
        if (itemId === 'logout') {
            logout();
        } else {
            setActiveSection(itemId);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="content-section">
                        <h2>Personal Information</h2>
                        <div className="profile-info">
                            <div className="avatar">
                                <img src="https://tse2.mm.bing.net/th/id/OIP.o9NFFhAXoo8gQy-n6QF2bQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Avatar" />
                                <button className="change-avatar-btn">Change Avatar</button>
                            </div>
                            <div className="info-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" defaultValue="johndoe@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" defaultValue="0123456789" />
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" defaultValue="1990-01-01" />
                                </div>
                                <button className="save-btn">Save Changes</button>
                            </div>
                        </div>
                    </div>
                );
            case 'orders':
                return (<>
                    {showPassengerID ? <>
                        <div className='passengers-overlays' onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowPassengerID(undefined)
                            }
                        }}>
                            <div className='passengers-listbox'>
                                <label>Passengers</label>
                                {booking?.passengers.map((p, i) => {
                                    return <div className="passenger-row-item">
                                        <div>
                                            <div><strong>Fullname:</strong> {p.fullname}</div>
                                            <div><strong>Birth day:</strong> {formatDate(p.birth_day)}</div>
                                            <div><strong>Age type:</strong> {p.age_type}</div>
                                        </div>
                                        <div style={{ fontSize: 15 }}>
                                            {p.age_type == "Adult" ? booking?.tour.price.toLocaleString() : (booking?.tour.price * 0.8).toLocaleString()} VND
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div></> : <></>}
                    <div className="orders-section">
                        <h2>Your Orders</h2>
                        <div className="order-settings">
                            {bookings?.data?.map((e, i) => {
                                return (<>
                                    <div className='booking-item'>
                                        <div className='__tour'>
                                            <img src={e.tour.thumbnailURL} />
                                            <div className='__content'>
                                                <div>
                                                    <div className='___title'>{e.tour.title}</div>
                                                    <div className='___sub'>{formatEstimatedTime(e.tour.estimated_time)}</div>
                                                </div>
                                                <div>
                                                    <Button color={"white"} backgroundColor={"#328cdbff"} iconLeft={<Link2 />} value={'View detail'} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='__detail'>
                                            <table id="booking-table">
                                                <tr>
                                                    <th>Created date</th>
                                                    <td>{`${new Date(e.created_at).toLocaleDateString()} - ${new Date(e.created_at).toLocaleTimeString()}`}</td>
                                                </tr>
                                                <tr>
                                                    <th>Fullname</th>
                                                    <td>{e?.fullname}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{e?.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone</th>
                                                    <td>{e?.phone}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th>
                                                    <td>
                                                        <div className='__status-cell'>
                                                            <div className={`___status ${e.status}`}>
                                                                {(e?.status + "").toLocaleUpperCase()}
                                                            </div>
                                                            {e.status == 'Unpaid' ? <>
                                                                <a href={`/payment/${e.id}`}>To payment</a>
                                                            </> : <div style={{ fontSize: 12, color: "#30a76cff" }}>Thank for used our service</div>}
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Pickup Address</th>
                                                    <td>{e?.specific_address}, {province?.find(p => p.codename === e?.province)?.name} , {province?.find(p => p.codename === e?.province)?.wards?.find(w => w.codename === e?.ward)?.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Departure At</th>
                                                    <td>{formatDate(e?.diparture_at)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Passengers</th>
                                                    <td>
                                                        <div >
                                                            <div style={{ textDecoration: "underline", cursor: "pointer" }}
                                                                onClick={() => setShowPassengerID(e.id)}
                                                            >
                                                                Show ({e.passengers.length})
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td><strong style={{ fontSize: 20 }}>{e?.total_amount?.toLocaleString()}</strong> VND</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </>)
                            })}
                        </div>
                    </div>
                </>)
            case 'security':
                return (
                    <div className="content-section">
                        <h2>Security Settings</h2>
                        <div className="security-settings">
                            <div className="setting-item">
                                <h3>Change Password</h3>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" />
                                </div>
                                <button className="save-btn">Update Password</button>
                            </div>
                            <div className="setting-item">
                                <h3>Two-factor authentication (2FA)</h3>
                                <p>Enable 2FA to enhance your account security</p>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="content-section">
                        <h2>Privacy Settings</h2>
                        <div className="privacy-settings">
                            <div className="setting-item">
                                <h3>Show Personal Information</h3>
                                <p>Allow others to view your personal information</p>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <h3>Show Recent Activity</h3>
                                <p>Allow others to see your recent activity</p>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <h3>Allow Messaging</h3>
                                <p>Allow strangers to send you messages</p>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="content-section">
                        <h2>Notification Settings</h2>
                        <div className="notification-settings">
                            <div className="setting-item">
                                <h3>Email Notifications</h3>
                                <p>Receive notifications via email</p>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <h3>Push Notifications</h3>
                                <p>Receive notifications in your browser</p>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <h3>New Message Notifications</h3>
                                <p>Get notified when you receive a new message</p>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'language':
                return (
                    <div className="content-section">
                        <h2>Language Settings</h2>
                        <div className="language-settings">
                            <div className="form-group">
                                <label>Select Language</label>
                                <select defaultValue="en">
                                    <option value="vi">Vietnamese</option>
                                    <option value="en">English</option>
                                    <option value="zh">中文</option>
                                    <option value="ja">日本語</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date Format</label>
                                <select defaultValue="dd-mm-yyyy">
                                    <option value="dd-mm-yyyy">DD-MM-YYYY</option>
                                    <option value="mm-dd-yyyy">MM-DD-YYYY</option>
                                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                                </select>
                            </div>
                            <button className="save-btn">Save Settings</button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="content-section">
                        <h2>Page Not Found</h2>
                        <p>Sorry, the page you are looking for does not exist.</p>
                    </div>
                );
        }
    };

    return (
        <div className='container-page'>
            <div className="personal-info-container">
                <div className="sidebar">
                    <h2 className="sidebar-title">Settings</h2>
                    <ul className="menu-list">
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleMenuClick(item.id)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="main-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
