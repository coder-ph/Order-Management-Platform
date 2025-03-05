import React, {useState} from "react";
import { MainButton } from "../Components/Buttons/Button";
import { Bell } from "lucide-react"
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import CategorySection from "./CategorySection";
import FilterPopup from "./InventoryFilter";

const ProductHeader = ({ searchQuery, setSearchQuery, setFilterOpen, filterOpen, setDialogOpen }) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <>
            <div className="header">
                <h1>INVENTORY MANAGEMENT</h1>
                <div className="notifications">
                    <MainButton onClick={() => {}} style={{ position: 'relative', backgroundColor:"transparent", border: "none", padding: "0" }}>
                        <span className="notification-icon"><Bell size={24} /></span>
                        <span className="notification-badge"></span>
                    </MainButton>
                </div>
            </div>
            
            <div className="card">
                <div className="card-content">
                    <div className="toolbar">
                        <div className="search-filter">
                            <div className="search-container">
                                <span className="search-icon"><IoMdSearch style={{fontSize:"16px"}}/></span>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="filter-container">
                                <MainButton onClick={() => setFilterOpen(!filterOpen)} style={{ backgroundColor: "transparent", border: "1px solid white", padding: "9px", marginTop:"4px", position:"relative" }}>
                                    <CiFilter />
                                </MainButton>
                            </div>
                        </div>
                        
                        <MainButton onClick={() => setDialogOpen(true)} style={{ backgroundColor:"transparent", border: "1px solid white", padding: "8px", position:"relative", width:"20%", marginLeft:"100px" }}>
                            Add Product
                        </MainButton>
                    </div>
                    <div className="category-section">
                            <CategorySection setSelectedCategory={setSelectedCategory}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductHeader;