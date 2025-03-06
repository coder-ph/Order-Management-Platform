import React from "react";
import { FaPlus } from "react-icons/fa";
import { MainButton } from "./Buttons/Button";
import CategorySection from "./CategorySection";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { IoMdSearch } from "react-icons/io";



const ProductHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  setFilterOpen, 
  filterOpen, 
  setDialogOpen, 
  setSelectedCategory 
}) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="inventory-managemnt">INVENTORY MANAGEMENT</h1>
      <div className="flex justify-between items-center w-full px-4 py-2">
        <div className="flex items-center gap-2 mb-10">
          <input
            type="text"
            placeholder="Search inventory..."
            className="border rounded-md px-3 py-1.5 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-button">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`p-2 rounded-md ${filterOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-500'}`}
          >
           <FilterAltOutlinedIcon style={{ color: "white" }} /> 
          </button>
        </div>
        </div>
        
        <MainButton label="Add Product" icon={<FaPlus className="mr-2" />} onClick={() => setDialogOpen(true)} style={{ backgroundColor: "transparent", border: "2px solid white", color: "white", width: "180px", marginBottom: "40px"}}> Add Product </MainButton>
      </div>
      <CategorySection setSelectedCategory={setSelectedCategory} />
    </div>
  )
}

export default ProductHeader;