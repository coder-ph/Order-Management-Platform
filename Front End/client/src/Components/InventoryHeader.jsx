import React from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { MainButton } from "./Buttons/Button";
import CategorySection from "./CategorySection";

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
      <div className="flex justify-between items-center w-full px-4 py-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search inventory..."
            className="border rounded-md px-3 py-1.5 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`p-2 rounded-md ${filterOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaFilter />
          </button>
        </div>
        
        <button label="Add Product" icon={<FaPlus className="mr-2" />} onClick={() => setDialogOpen(true)}> Add Product </button>
      </div>
      <CategorySection setSelectedCategory={setSelectedCategory} />
    </div>
  )
}

export default ProductHeader;