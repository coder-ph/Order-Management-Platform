import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

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
                <form onSubmit={handleSubmit}>
                    {[
                        { label: 'Product Name', type: 'text', name: 'product_name', value: newProduct.product_name },
                        { label: 'Price ($)', type: 'number', name: 'price', value: newProduct.price, step: '0.01', min: '0' },
                        { label: 'Quantity', type: 'number', name: 'quantity', value: newProduct.quantity, min: '0' },
                        { label: 'Description', type: 'textarea', name: 'description', value: newProduct.description, rows: '3' }
                    ].map(({ label, ...inputProps }) => (
                        <div className="form-grp" key={inputProps.name}>
                            <label>{label}</label>
                            {inputProps.type === 'textarea' ? (
                                <textarea {...inputProps} onChange={handleInputChange} />
                            ) : (
                                <input {...inputProps} onChange={handleInputChange} required />
                            )}
                        </div>
                    ))}
                    <div className="form-grp">
                        <label>Category</label>
                        {!showAddCategory ? (
                            <>
                                <select 
                                    name="category_id" 
                                    value={newProduct.category_id} 
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" onClick={() => setShowAddCategory(true)} style={{ marginTop: '10px', backgroundColor: '#4cceac' }}>Add New Category</button>
                            </>
                        ) : (
                            <>
                                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Enter new category name" required />

                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button type="button" onClick={handleAddCategory} style={{ backgroundColor: '#4cceac' }}>Save Category</button>
                                    <button type="button" onClick={() => setShowAddCategory(false)} style={{ backgroundColor: '#f44336' }}>Cancel</button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="form-grp">
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
                        <button type="submit" style={{ backgroundColor: '#4cceac' }}>{isEditing ? 'Update Product' : 'Add Product'}</button>
                            {isEditing ? 'Update Product' : 'Add Product'}
                        <button type="button" onClick={() => setDialogOpen(false)} style={{ backgroundColor: '#f44336' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductDialog;