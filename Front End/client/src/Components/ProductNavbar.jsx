import React from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../Redux/Order/orderSelectors";
import "../assets/styles/NavBar.css";

const Navbar = ({ cartItemCount, onSearch, onCartClick }) => {
  const totalItems = useSelector(selectCartItemCount);

  return (
    <div className="navbar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="cart-icon" onClick={onCartClick}>
        <span role="img" aria-label="cart">
          🛒
        </span>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>
    </div>
  );
};

export default Navbar;
