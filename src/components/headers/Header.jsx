import { useLocation, useNavigate } from 'react-router-dom'
import './header.css'
import { useEffect, useState } from 'react';
import { ChevronDown, LogOut, Menu, Search, User } from 'lucide-react';
import { logout } from '../../services/AccountService';
import TextField from '../ui/TextField';
import SearchBox from '../search/SearchBox';
import Button from '../ui/Button';


function Header() {
    const nav = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState('home')
    const [forcusSearchBar, setForcusSearchBar] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    })
    const [isAtTop, setIsAtTop] = useState(true);
    const [isHomePage, setIsHomePage] = useState(true);

    useEffect(() => {
        setIsHomePage(location.pathname === '/')
    }, [location])
    useEffect(() => {
        const mainLayout = document.querySelector('.main-container');
        const onScroll = () => {
            if (isHomePage) {
                setIsAtTop((mainLayout.scrollTop < 200));
            }
        };
        mainLayout.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const username = window.localStorage.getItem("account_username");
        const email = window.localStorage.getItem("account_email");
        if (username) {
            setUserData({ username: username, email: email });
        }
    }, [])
    return (<>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />
        <link rel="stylesheet" href="style.css" />
        <title>Travel V</title>
        {forcusSearchBar ? <SearchBox onClose={() => setForcusSearchBar(false)} /> : <></>}

        <header className={`header-container ${isAtTop && isHomePage ? "nav-top" : "nav-scrolled"}`}>
            <div className="header-left">
                <Button className={'menu-button'} onClick={() => setShowMenu(true)} backgroundColor={'transparent'} iconLeft={<Menu color='#6d6d6dff' strokeWidth={1} size={50} />} />
                <a href="/travelv-landingpage/" className="logoname">TRAVEL V</a>
                <div className={`header-menu ${showMenu ? 'show' : 'hide'}`} onClick={() => setShowMenu(false)}>
                    <div className='menus'>
                        <a onClick={() => nav('/')} className={tab == 'home' && 'active'}>Home</a>
                        <a onClick={() => nav('/locations')} className={tab == 'locations' && 'active'}>Destinations</a>
                        <a onClick={() => nav('/blogs')} className={tab == 'blogs' && 'active'}>Blogs</a>
                        <a href="#" className={tab == 'version' && 'active'}>Tutorial</a>
                        <a href="#" className={tab == 'compare' && 'active'}>About</a>
                    </div>
                </div>
            </div>
            <div>
                <TextField
                    iconLeft={<Search color='rgba(85, 85, 85, 1)' />}
                    borderRadius={50}
                    placeholder={'search tour, locate, service'}
                    onClick={() => setForcusSearchBar(true)}
                />
            </div>
            <div className="header-right">
                <div className="language-selector">
                    <i className="fas fa-globe"></i>
                    <span>EN</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {userData.username == "" ? <div onClick={() => {
                    nav('/signin')
                }} className="user-icon">
                    Sign in
                </div> :
                    <div className='user-menu-select'>
                        <div>
                            <div className='user-username'>{userData.username}</div>
                            <div className='user-email'>{userData.email}</div>
                        </div>
                        <div><ChevronDown /></div>
                        <div className='user-dropboxs'>
                            <div className='user-dropbox-box' onClick={() => nav('/me')}><User color='#CCC' /> Account</div>
                            <div className='user-dropbox-box' onClick={() => logout()}><LogOut color='#CCC' /> Log out</div>
                        </div>
                    </div>
                }
            </div>
        </header>
    </>)
}
export default Header