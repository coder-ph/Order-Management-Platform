import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Order/orderActions";
import "../assets/styles/ProductGrid.css";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">ksh {product.price}</p>
              <p className="product-description">
                {product.description.length > 50
                  ? `${product.description.substring(0, 50)}...`
                  : product.description}
              </p>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({ ...product, quantity: 1 })); // Include quantity
              }}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className="no-products">No products found matching your criteria.</p>
      )}
    </div>
  );
};

export default ProductGrid;
