import { Outlet } from 'react-router-dom'
import Header from '../components/headers/Header'
import './layout.css'
import MainFooter from '../components/footers/MainFooter'
import { useEffect, useState } from 'react';

export function useScrollTop() {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return isAtTop;
}


function MainLayout() {
    return (<>
        <div className='main-container'>
            <Header />
            <div className='main-context-container'>
                <Outlet />
            </div>
            <MainFooter/>
        </div>
    </>)
}
export default MainLayout