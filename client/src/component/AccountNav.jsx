import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function AccountNav() {
    const {pathname} = useLocation();
    console.log(pathname);
    
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined) {
        subpage = 'profile';
    }
    function linkClasses(type = null) {
        let classes = 'py-2 px-6 flex gap-1 items-center rounded-full';

        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200'
        }
        return classes;
    }
    return (
        <>
            <nav className='w-full flex flex-wrap mt-8 mb-8 justify-center gap-2 '>
                <Link className={linkClasses('profile')} to={'/account'} >
                    <i className="fa-regular fa-user"></i>
                    My profile
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <i className="fa-solid fa-bars"></i>
                    My bookings
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <i className="fa-solid fa-hotel"></i>
                    My accommodations
                </Link>
            </nav>
        </>
    )
}

export default AccountNav
