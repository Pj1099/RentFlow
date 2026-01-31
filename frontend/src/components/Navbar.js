import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Rental</span>
          <span className="logo-accent">Hub</span>
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/products" className="navbar-link">Products</Link></li>
          
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard" className="navbar-link">
                <FaTachometerAlt /> Dashboard
              </Link></li>
              
              {user?.role === 'vendor' && (
                <>
                  <li><Link to="/vendor/products" className="navbar-link">My Products</Link></li>
                  <li><Link to="/vendor/orders" className="navbar-link">My Orders</Link></li>
                </>
              )}
              
              {user?.role === 'admin' && (
                <>
                  <li><Link to="/admin/dashboard" className="navbar-link">Admin</Link></li>
                  <li><Link to="/admin/users" className="navbar-link">Users</Link></li>
                </>
              )}
              
              {user?.role === 'customer' && (
                <li><Link to="/cart" className="navbar-link cart-link">
                  <FaShoppingCart />
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link></li>
              )}
              
              <li className="navbar-dropdown">
                <button className="navbar-link dropdown-toggle">
                  <FaUser /> {user?.name}
                </button>
                <ul className="dropdown-menu">
                  <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                  <li><Link to="/orders" className="dropdown-item">My Orders</Link></li>
                  <li><Link to="/invoices" className="dropdown-item">Invoices</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="navbar-link">Login</Link></li>
              <li><Link to="/register" className="btn btn-primary navbar-btn">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
