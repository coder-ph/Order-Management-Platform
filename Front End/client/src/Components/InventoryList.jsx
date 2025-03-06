import React, { useState } from "react";
import { MainButton } from "../Components/Buttons/Button";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const ProductList = ({ products, handleStatusChange, onEdit, onDelete }) => {
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
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(products.length / rowsPerPage);

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handleRowsChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    }

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }
    const goToPrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const toggleDropdown = (productId) => {
        if (activeDropdown === productId) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(productId);
        }
    } 

    // Close dropdown when clicking outside
    const handleClickOutside = () => {
        setActiveDropdown(null);
    };
    
    return (
        <div className="card" onClick={handleClickOutside}>
            <div className="card-content">
                <div className="table-container">
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
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="product-info">
                                        <img
                                            src={product.image || '/api/placeholder/48/48'}
                                            alt={product.product_name}
                                        />
                                        <div>
                                            <div className="product-name-inventory-list">{product.product_name}</div>
                                            <div className="product-category">{product.category_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${parseFloat(product.price).toFixed(2)}</td>
                                <td>{product.quantity}</td>
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
                                            style={{
                                                backgroundColor:'transparent', 
                                                textAlign:'center', 
                                                marginRight:'5px', 
                                                color:'#4cceac'
                                            }}
                                                
                                        >
                                            <FaRegEdit />
                                        </MainButton>
                                        
                                        {activeDropdown === product.id && (
                                            <div 
                                                className="dropdown-menu" 
                                                style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '100%',
                                                    backgroundColor: '#1f2945',
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
                                                        borderBottom: '1px solid #eee',
                                                        color: 'white'
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
                 <hr className="table-end-line"/>
                <div className="table-footer">
                    <div>
                        Rows per page:
                        <select value={rowsPerPage} onChange={handleRowsChange} style={{ padding:'5px', border:'1px solid white', backgroundColor:'transparent', color:'white', marginLeft: "2px"}}>
                            <option className="option-inventory-list" value="5">5</option>
                            <option className="option-inventory-list" value="10">10</option>
                            <option className="option-inventory-list" value="20">20</option>
                            <option className="option-inventory-list" value="50">50</option>
                        </select>
                    </div>
                    <div className="table-footer-right">
                        <MainButton onClick={goToPrevPage} disabled={page ===1} style={{backgroundColor: "transparent", border:"none", cursor: "pointer", padding: "4px 8px", fontSize:"16px"}}><IoIosArrowBack /></MainButton>
                        <span className="active">{page}</span>
                        <MainButton onClick={goToNextPage} disabled={page === totalPages} style={{backgroundColor: "transparent", border:"none", cursor: "pointer", padding: "4px 8px", fontSize:"16px"}}><IoIosArrowForward /> </MainButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;