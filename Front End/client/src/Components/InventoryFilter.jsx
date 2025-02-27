import React from "react";
import { MainButton } from "../Components/Buttons/Button";

const FilterPopup = ({ filters, setFilters, categories }) => {
    const orderStatus = ['pending', 'accepted','rejected', 'canceled', 'assigned', 'delivered']

    return (
        <div className="filter-pop">
            <div className="filter-content">
                <div className="filter-grp">
                    <label>Category</label>
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value=''>All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-grp">
                    <label>Price Range</label>
                    <select
                        value={filters.priceRange}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                        <option value=''>All prices</option>
                        <option value='0-20'>$0 - $20</option>
                        <option value='21-40'>$21 - $40</option>
                        <option value='41-60'>$41 - $60</option>
                        <option value='61-80'>$61 - $80</option>
                        <option value='81-100'>$81 - $100</option>
                    </select>
                </div>
                <div className="filter-grp">
                    <label>Status</label>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value=''>All status</option>
                        {orderStatus.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <MainButton onClick={() => setFilters({ category: '', priceRange: '', status: '' })}>
                    Clear Filters
                </MainButton>
            </div>
        </div>
    )
}

export default FilterPopup