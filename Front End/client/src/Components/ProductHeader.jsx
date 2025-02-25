import React from "react";
import { MainButton } from "../Components/Buttons/Button";

const ProductHeader = ({ searchQuery, setSearchQuery, setFilterOpen, filterOpen, setDialogOpen }) => {
    return (
        <>
            <div className="header">
                <div className="page-path">
                    <span>Home</span>
                    <span>/</span>
                    <span>Products</span>
                    <span>/</span>
                    <span>Product List</span>
                </div>
                <h1>Products</h1>
                <div className="notifications">
                    <MainButton onClick={() => {}} style={{ position: 'relative' }}>
                        <span className="notification-icon">🔔</span>
                        <span className="notification-badge"></span>
                    </MainButton>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <div className="toolbar">
                        <div className="search-filter">
                            <div className="search-container">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="filter-container">
                                <MainButton onClick={() => setFilterOpen(!filterOpen)}>
                                    Filter
                                </MainButton>
                            </div>
                        </div>
                        <MainButton onClick={() => setDialogOpen(true)}>
                            Add Product
                        </MainButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductHeader;