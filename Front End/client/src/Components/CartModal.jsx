import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeFromCart, updateCartItem } from "../Redux/Order/orderActions";
import "../assets/styles/Cart.css";

const CartModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);

  
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId); 
    } else {
      dispatch(updateCartItem({ id: productId, quantity: newQuantity }));
    }
  };

  
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price); 
      const quantity = Number(item.quantity); 

      
      if (!isNaN(price) && !isNaN(quantity) && price >= 0 && quantity >= 0) {
        return total + price * quantity;
      } else {
        console.error(`Invalid price or quantity for item: ${item.name}`);
        return total; 
      }
    }, 0);
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>ksh {item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>
                  ksh{" "}
                  {!isNaN(calculateTotal())
                    ? calculateTotal().toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
