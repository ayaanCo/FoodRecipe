import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from './Context';
import './Navbar.css'
import SearchModal from './SearchModel';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { islogin, setislogin } = useContext(Context);
  const {isSearchOpen,setIsSearchOpen}=useContext(Context)

  const navigate = useNavigate();

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setislogin(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
        Recipe<span className='hub'>Hub</span>
        </Link>

        {/* Hamburger Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/myrecipe" onClick={() => setMenuOpen(false)}>My Recipe</Link></li>
            <li><Link to="/fav" onClick={() => setMenuOpen(false)}>Favourites</Link></li>
            <li><Link onClick={() => {setIsSearchOpen(true),setMenuOpen(false)}}>Search</Link></li>
            {user?.role === 'admin' && (
              <li><Link to="/recipe/Admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
            )}

            {islogin ? (
              <li onClick={() => { handleLogout(); setMenuOpen(false); }}>
                <span className="logout-link">Logout</span>
              </li>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
