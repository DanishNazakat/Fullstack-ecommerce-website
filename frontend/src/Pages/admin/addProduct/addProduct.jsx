import React, { useState } from 'react';
import { addProduct } from '../../../services/products/addProduct';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // 🔥 Hot Toast Import
import './AddProduct.css';

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await addProduct(formData);
      if (response.success) {
        toast.success("Product added successfully!"); // 🔥 Success Toast
        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || "Error adding product"); // 🔥 Error Toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ap-wrapper">
      {/* 🔥 Toaster Component */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="ap-container">
        <div className="ap-header">
          <button className="ap-back-btn" onClick={() => navigate(-1)} title="Go Back">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2>Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="ap-form">
          <div className="ap-group">
            <label>Product Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Premium Wireless Headphones"
              required 
            />
          </div>

          <div className="ap-row">
            <div className="ap-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>
            <div className="ap-group">
              <label>Price ($)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="0.00"
                required 
              />
            </div>
          </div>

          <div className="ap-row">
            <div className="ap-group">
              <label>Stock Quantity</label>
              <input 
                type="number" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                placeholder="How many items?"
                required 
              />
            </div>
            <div className="ap-group">
              <label>Product Image</label>
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  required 
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="custom-file-upload">
                  <span className="material-symbols-outlined">cloud_upload</span>
                  {file ? file.name : "Choose Image"}
                </label>
              </div>
            </div>
          </div>

          <div className="ap-group">
            <label>Product Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Tell customers about this product..."
              rows="4"
              required 
            />
          </div>

          <button type="submit" disabled={loading} className="ap-submit-btn">
            {loading ? (
              <span className="ap-loader"></span>
            ) : (
              <>
                <span className="material-symbols-outlined">add_circle</span>
                Upload Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;