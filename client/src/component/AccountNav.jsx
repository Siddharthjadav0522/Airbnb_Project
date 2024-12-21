import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function AccountNav() {
    const {pathname} = useLocation();
    
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined) {
        subpage = 'profile';
    }
    function linkClasses(type = null) {
        let classes = 'md:py-2 md:px-6 py-2 px-4 flex gap-2 block w-60 md:w-auto items-center rounded-full';

        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200'
        }
        return classes;
    }
    return (
        <>
            <nav className='w-full flex flex-wrap mt-8 mb-8 justify-center items-center gap-2 '>
                <Link className={linkClasses('profile')} to={'/account'} >
                    <i className="fa-regular fa-user ms-2 md:ms-0 text-lg"></i>
                    My profile
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <i className="fa-solid fa-bars ms-2 md:ms-0 text-lg"></i>
                    My bookings
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <i className="fa-solid fa-hotel ms-2 md:ms-0 text-lg"></i>
                    My accommodations
                </Link>
            </nav>
        </>
    )
}

export default AccountNav
