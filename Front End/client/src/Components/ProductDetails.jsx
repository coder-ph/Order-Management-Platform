import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Order/orderActions";
import { selectProductById } from "../Redux/Order/orderSelectors";
import Navbar from "./ProductNavbar";
import "../../src/assets/styles/ProductDetails.css";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MainButton } from "./Buttons/Buttons";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => selectProductById(state, Number(id)));
  const cart = useSelector((state) => state.order.cart);
  const [quantity, setQuantity] = useState(1);

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleCartAction = () => {
    if (isProductInCart(product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleCheckout = () => {
    navigate("/payment");
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }


  return (
    <div>
      <div>
        <div>
          <div className="product-details-container">
            <div className="fixed top-0 left-0">
              <Navbar />
            </div>
            
            <div className="product-image-section">
              <img
                src={product.image}
                alt={product.name}
                className="product-main-image"
              />
            </div>
           
            <div className="product-info">
               <div className="back-to-prods">
              <button className="back-to-products-button"><Link to="/user-products"><HiOutlineArrowRight /></Link></button>
              </div>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">Ksh {product.price}</p>
              <p className="product-description">{product.description}</p>

            

              <div className="quantity-control">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="justify-between">
               
                <button
                  className={`add-to-cart-btn ${
                    isProductInCart(product.id) ? "remove-from-cart" : ""
                  }`}
                  onClick={handleCartAction}
                  style={{width: "200px", backgroundColor:"transparent", color: "#141b2d", border: "2px solid #141b2d"}}
                >
                  {isProductInCart(product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>

                <button className="chkout" onClick={handleCheckout} style={{marginTop:"5px", marginLeft:"10px", backgroundColor:"#141b2d", color:"#fff", cursor: "pointer", padding:"11px", fontSize:"14px"}}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
