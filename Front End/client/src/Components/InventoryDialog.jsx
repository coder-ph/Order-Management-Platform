import React from "react";
import { MainButton } from "./Buttons/Button";

const ProductDialog = ({ newProduct, setNewProduct, handleAddProduct, setDialogOpen, categories }) => {
    return (
        <div className="dg-overlay">
            <div className="dialog">
                <div className="dg-header">
                    <h2>Add Product</h2>
                    <MainButton onClick={() => setDialogOpen(false)}>
                        ×
                    </MainButton>
                </div>
                <form onSubmit={handleAddProduct} className="dg-content">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            required
                        >
                            <option value=''>Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                            {/* Allow for creating new categories */}
                            <option value="new">+ Add New Category</option>
                        </select>
                    </div>
                    {newProduct.category === 'new' && (
                        <div className="form-group">
                            <label>New Category Name</label>
                            <input
                                type="text"
                                value={newProduct.newCategory || ''}
                                onChange={(e) => setNewProduct({ 
                                    ...newProduct, 
                                    newCategory: e.target.value,
                                    category: e.target.value
                                })}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            min='0'
                            step='0.01'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            min='0'
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                        />
                        {!newProduct.image && (
                            <p className="help-text">No image selected. A placeholder will be used.</p>
                        )}
                    </div>
                    <div className="dg-actions">
                        <MainButton type="button" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </MainButton>
                        <MainButton type='submit'>
                            Add Product
                        </MainButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductDialog;