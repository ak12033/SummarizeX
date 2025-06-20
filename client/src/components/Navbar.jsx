import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';

const Navbar = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    const user = useMemo(() => {
        if (token) {
            try {
                return jwtDecode(token);
            } catch (e) {
                console.error('Invalid token');
                return null;
            }
        }
        return null;
    }, [token]);

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to={user ? "/dashboard" : "/"}>
                <h1 className="text-xl font-bold cursor-pointer">Knowledge Hub</h1>
            </Link>

            {user && (
                <div className="space-x-4">
                    {location.pathname !== '/add-article' && (
                        <Link className='hover:text-green-300' to="/add-article">Add Article</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
