import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';
import AccountNav from './AccountNav';

function Header() {
    const { user ,setUser } = useContext(UserContext);
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const logout = async () => {
        await axios.post('/user/logout');
        setUser(null);
        navigate('/');
    }

    return (
        <header className='flex justify-between items-center flex-wrap'>
            {/* Logo */}
            <Link to='/' className='logo gap-1 flex text-primary items-center'>
                <i className="fa-brands fa-airbnb text-4xl"></i>
                <span className='font-bold text-xl'>airbnb</span>
            </Link>

            {/* Search bar */}
            <div className='gap-3 items-center border border-gray-300 rounded-full py-2 px-3 shadow-md shadow-gray-200 md:flex hidden'>
                <div className='text-sm'>Anywhere</div>
                <div className="border border-l border-gray-300 h-6"></div>
                <div className='text-sm'>Any week</div>
                <div className="border border-l border-gray-300 h-6"></div>
                <div className='text-gray-500 text-sm'>Add guests</div>
                <button className='bg-primary text-white p-1 rounded-full w-8 h-8 flex items-center justify-center'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            {/* User/Account Menu */}
            <div className='relative'>
                <button
                    onClick={toggleMenu}
                    className='flex gap-3 border border-gray-300 rounded-full py-2 px-4 items-center'>
                    <i className="fa-solid fa-bars text-gray-700"></i>
                    <div className='bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    {user && <div>{user.name}</div>}
                </button>

                {/* Menu dropdown */}
                {menu && (
                    <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <Link to={user ? '/account' : '/login'} onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white">
                            {user ? 'Account' : 'Login'}
                        </Link>
                        {user && (
                            <div onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white">
                                <button onClick={logout} >Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
