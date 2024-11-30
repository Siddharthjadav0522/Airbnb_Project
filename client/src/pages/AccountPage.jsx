import { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../component/UserContext'
import { Navigate, Link, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';

function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage == undefined) {
        subpage = 'profile';
    }
    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }
    if (!ready) {
        return "Loading...";
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    };



    function linkClasses(type = null) {
        let classes = 'py-2 px-6 flex gap-1 items-center rounded-full';

        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200'
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
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

            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Loggin in as user.name {user.name} user.email ({user.email}) <br />
                    <button onClick={logout} className='bg-primary text-white w-full p-2 rounded-2xl max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}

        </div>
    )
}

export default AccountPage;
