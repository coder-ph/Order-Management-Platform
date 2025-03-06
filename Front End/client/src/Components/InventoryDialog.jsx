import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MainButton } from "./Buttons/Button";

const ProductDialog = ({ 
    newProduct, 
    setNewProduct, 
    handleAddProduct, 
    handleEditProduct,
    setDialogOpen, 
    categories,
    isEditing = false
}) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            const response = await fetch('https://order-management-platform.onrender.com/api/v1/products/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName })
            });
            const result = await response.json();
            if (result.success) {
                setNewProduct({ ...newProduct, category_id: result.data.id })
                setNewCategoryName('')
                setShowAddCategory(false)
                alert('Category added successfully!')
            } else {
                alert(`Error adding category: ${result.message}`)
            }
        } catch (err) {
            console.error("Error adding category", err)
            alert('Error adding category. Please try again.')
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewProduct({ ...newProduct, [name]: value })
    }

    const handleImageChange = (e) => {
        setNewProduct({ ...newProduct, image: e.target.files[0] })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isEditing ? handleEditProduct(newProduct.id, newProduct) : handleAddProduct(e)
    }

    return (
        <div className="products-dialog">
            <div className="dialog-content">
                <div className="dg-header">
                    <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                    <button
                        onClick={() => setDialogOpen(false)} 
                        style={{ 
                            backgroundColor: "transparent", 
                            border: "none", 
                            padding: "0", 
                            color: "white", 
                            marginLeft: "350px"
                        }}
                    >
                        <IoCloseSharp />
                    </button>
                </div>
                <div className="dg-content">
                <form className="form-group" onSubmit={handleSubmit}>
                    {[
                        { label: 'Product Name', type: 'text', name: 'product_name', value: newProduct.product_name },
                        { label: 'Price ($)', type: 'number', name: 'price', value: newProduct.price, step: '0.01', min: '0' },
                        { label: 'Quantity', type: 'number', name: 'quantity', value: newProduct.quantity, min: '0' },
                        { label: 'Description', type: 'textarea', name: 'description', value: newProduct.description, rows: '3' }
                    ].map(({ label, ...inputProps }) => (
                        <div className="form-group" key={inputProps.name}>
                            <label>{label}</label>
                            {inputProps.type === 'textarea' ? (
                                <textarea {...inputProps} onChange={handleInputChange} style={{ border: "1px solid white", borderRadius: "5px", backgroundColor: "#3c4a75", color: "white"}} />
                            ) : (
                                <input {...inputProps} onChange={handleInputChange} required />
                            )}
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Category</label>
                        {!showAddCategory ? (
                            <>
                                <select 
                                    name="category_id" 
                                    value={newProduct.category_id} 
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option className= "select-category-option"value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <MainButton type="button" onClick={() => setShowAddCategory(true)} style={{ marginTop: '10px', backgroundColor: '#4cceac' }}>Add New Category</MainButton>
                            </>
                        ) : (
                            <>
                                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Enter new category name" required />

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <MainButton type="button" onClick={handleAddCategory} style={{ backgroundColor: '#4cceac' }}>Save Category</MainButton>
                                    <MainButton type="button" onClick={() => setShowAddCategory(false)} style={{ backgroundColor: 'transparent' }}>Cancel</MainButton>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <input type="file"  accept="image/*" onChange={handleImageChange} />

                        {newProduct.image && typeof newProduct.image === 'string' && (
                            <div className="image-preview">
                                <img 
                                    src={newProduct.image} 
                                    alt="Product preview" 
                                    style={{ maxWidth: '100px', marginTop: '10px' }} 
                                />
                            </div>
                        )}
                    </div>
                
                    <div className="dialog-actions">
                        <MainButton type="button" onClick={() => setDialogOpen(false)} style={{ backgroundColor: "transparent"}}>Cancel</MainButton>
                        <MainButton type="submit" style={{ backgroundColor: '#4cceac' }}>{isEditing ? 'Update Product' : 'Add Product'}</MainButton>
                        
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ProductDialog;