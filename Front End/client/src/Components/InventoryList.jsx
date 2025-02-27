import React, { useState } from "react";
import { MainButton } from "../Components/Buttons/Button";

const ProductList = ({ products, handleStatusChange, onEdit, onDelete }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const getStatusColor = (status) => {
        const statusStr = String(status)

        switch (statusStr) {
            case 'pending':
                return '#FFA500'; // Orange
            case 'accepted':
                return '#4CAF50'; // Green
            case 'rejected':
                return '#F44336'; // Red
            case 'canceled':
                return '#9E9E9E'; // Gray
            case 'assigned':
                return '#2196F3'; // Blue
            case 'delivered':
                return '#8BC34A'; // Light Green
            default:
                return '#9E9E9E'; // Default Gray
        }
    }

    const toggleDropdown = (productId) => {
        if (activeDropdown === productId) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(productId);
        }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = () => {
        setActiveDropdown(null);
    };

    // const filteredProducts = products.filter(product => {
    //     if (!filters || !filters.status) {
    //         return true
    //     }
    //     return product.status === filters.status
    //})

    return (
        <div className="card" onClick={handleClickOutside}>
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
                                <select 
                                        value={product.status || 'pending'}
                                        onChange={(e) => handleStatusChange(product.id, e.target.value)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: getStatusColor(product.status || 'pending'),
                                            border: `1px solid ${getStatusColor(product.status || 'pending')}`,
                                            borderRadius: '4px',
                                            padding: '4px 8px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="canceled">Canceled</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="action-dropdown" style={{ position: 'relative' }}>
                                        <MainButton 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(product.id);
                                            }}
                                        >
                                            ⋮
                                        </MainButton>
                                        
                                        {activeDropdown === product.id && (
                                            <div 
                                                className="dropdown-menu" 
                                                style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '100%',
                                                    backgroundColor: 'white',
                                                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                                                    borderRadius: '4px',
                                                    zIndex: 10,
                                                    minWidth: '120px'
                                                }}
                                            >
                                                <div 
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        onEdit && onEdit(product);
                                                        setActiveDropdown(null);
                                                    }}
                                                    style={{
                                                        padding: '8px 16px',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #eee'
                                                    }}
                                                >
                                                    Edit
                                                </div>
                                                <div 
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        onDelete && onDelete(product.id);
                                                        setActiveDropdown(null);
                                                    }}
                                                    style={{
                                                        padding: '8px 16px',
                                                        cursor: 'pointer',
                                                        color: '#F44336'
                                                    }}
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                        )}
                                    </div>
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