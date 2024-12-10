import { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../component/UserContext'
import { Navigate, Link, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountNav from '../component/AccountNav';

function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage == undefined) {
        subpage = 'profile';
    }
    const logout = async () => {
        await axios.post('/user/logout');
        setRedirect('/');
        setUser(null);
    }
    if (!ready) {
        return "Loading...";
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav/>

            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Loggin in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className='bg-primary text-white w-full p-2 rounded-2xl max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}

        </div>
    )
}

export default ProfilePage;
