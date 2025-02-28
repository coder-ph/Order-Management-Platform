import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../assets/styles/ProductNavbar.css';

const Navbar = ({ cartItemCount, onSearch, onCartClick }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <span className="home-icon">⌂</span>
        </Link>
        <Link to="/products" className="nav-products">
          <span className="products-icon">☰</span>
        </Link>
      </div>
      <div className="nav-right">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="search" 
            onChange={handleSearchChange}
          />
          <button className="search-button"> <SearchIcon /> </button>
        </div>
        <button className="cart-button" onClick={onCartClick}>
          <div className="cart-icon">
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;