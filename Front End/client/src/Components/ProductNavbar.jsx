import React from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../Redux/Order/orderSelectors";
import { MdOutlineHelpOutline } from "react-icons/md"
import "../assets/styles/NavBar.css";

const Navbar = ({ cartItemCount, onSearch, onCartClick }) => {
  const totalItems = useSelector(selectCartItemCount);

  return (
    <div className="navbar  ">
      <div className="pl-35 text-amber-50">
        Logo
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          label = 'search'

          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="cart-icon" onClick={onCartClick} >
        <span role="img" aria-label="cart"><MdOutlineHelpOutline style={{ color:'White'}}/></span>
        <span role="img" aria-label="cart">
          🛒
        </span>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        <div>
          <img src="#" alt="image"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
