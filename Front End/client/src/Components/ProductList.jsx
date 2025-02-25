import React from "react";
import { MainButton } from "../Components/Buttons/Button";

const ProductList = ({ products, handleStatusChange }) => {
    return (
        <div className="card">
            <div className="card-content">
                <table className="Products-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="product-info">
                                        <img
                                            src={product.image || '/api/placeholder/48/48'}
                                            alt={product.name}
                                        />
                                        <div>
                                            <div className="product-name">{product.name}</div>
                                            <div className="product-category">{product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={product.status}
                                            onChange={(e) => handleStatusChange(product.id, e.target.checked)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <MainButton onClick={() => {}}>⋮</MainButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList;