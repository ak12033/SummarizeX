import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMemo, useState } from 'react';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setMenuOpen(false)
  };

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
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r 
      from-gray-900 via-gray-950 to-gray-900/80 border-b border-gray-800 
      shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-between px-10 py-3 
      transition-all duration-300"
    >
      {/* Logo */}
      <Link to={user ? "/dashboard" : "/"}>
        <h1
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 
          text-transparent bg-clip-text cursor-pointer tracking-wide drop-shadow-[0_0_18px_rgba(56,189,248,0.5)]
          hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Knowledge Hub
        </h1>
      </Link>

      {/* Right Side */}
      {user && (
        <div className="relative flex items-center gap-6 text-sm font-medium">
          {location.pathname !== '/add-article' && (
            <Link
              to="/add-article"
              className="relative px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 
              text-white shadow-md hover:scale-105 hover:shadow-cyan-400/40 transition duration-300 ease-in-out"
            >
              + New Article
            </Link>
          )}

          {/* User Icon */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br
            from-gray-800 to-gray-900 text-cyan-400 shadow-inner cursor-pointer hover:scale-110
            transition duration-300 ease-in-out"
          >
            <FiUser size={20} />
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              className="absolute right-0 top-14 w-32 bg-gray-500 border border-none rounded-2xl shadow-lg z-50"
            >
              <button
                onClick={logout}
                className="block w-full text-left px-10 py-2 text-md text-white rounded-2xl hover:bg-red-400 transition"
              >
                Logout
              </button>
              
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
