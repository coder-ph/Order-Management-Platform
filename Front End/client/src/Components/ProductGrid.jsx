import React, {useState} from 'react';
import '../assets/styles/ProductGrid.css'

const ProductGrid = ({ products, addToCart }) => {
    const [expandedProduct, setExpandedProduct] = useState(null);
  
    const toggleDescription = (productId) => {
      setExpandedProduct(expandedProduct === productId ? null : productId)
    }
  
    return (
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">ksh {product.price}</p>
                
                {product.description && (
                  <div className="product-description-container">
                    <button 
                      className="description-toggle" 
                      onClick={() => toggleDescription(product.id)}
                    >
                      {expandedProduct === product.id ? 'Hide details' : 'Show details'}
                    </button>
                    
                    {expandedProduct === product.id && (
                      <p className="product-description">{product.description}</p>
                    )}
                  </div>
                )}
              </div>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-products">No products found matching your criteria.</p>
        )}
      </div>
    )
  }
  
  export default ProductGrid;