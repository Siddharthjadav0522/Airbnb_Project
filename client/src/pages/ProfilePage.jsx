import { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../component/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountNav from '../component/AccountNav';

function ProfilePage() {
    const navigate = useNavigate();
    const { ready, user, setUser } = useContext(UserContext);

    const { subpage = 'profile' } = useParams();

    const logout = async () => {
        try {
            await axios.post('/user/logout');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login');
    //     }
    // }, [user, navigate]);

    if (!ready) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-lg text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <AccountNav />
            <div className="flex flex-grow items-center justify-center md:min-h-96 min-h-80">
                {subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto p-4">
                        <div className="mb-8">
                            <p className="text-lg">
                                <span className="mr-1">Logged in as:</span>
                                <span className="md:font-medium mr-2 text-md md:text-lg">{user.name}</span>
                                <span className="md:font-medium text-md md:text-lg">{user.email}</span>
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-primary md:text-lg font-medium text-white w-full md:py-3 py-2 px-6 rounded-2xl max-w-sm mx-auto"
                        >
                            Logout
                        </button>
                    </div>
                )}
                {subpage === 'places' && <PlacesPage />}
            </div>
        </div>
    );
}

export default ProfilePage;
