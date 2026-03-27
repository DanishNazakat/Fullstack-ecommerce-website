import React, { useState, useEffect } from "react";
import { updateProduct } from "../../../services/products/updateProduct";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../services/products/getProductById";
import toast, { Toaster } from "react-hot-toast"; // 🔥 Added
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setstock] = useState("");
  const [loading, setLoading] = useState(true); // 🔥 Added loading state
  const [isUpdating, setIsUpdating] = useState(false); // 🔥 Added button loading state

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const p = res.product;
        setname(p.name);
        setdescription(p.description);
        setprice(p.price);
        setcategory(p.category);
        setstock(p.stock);
      } catch (error) {
        toast.error("Failed to fetch product data");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateProduct(id, name, description, price, category, stock);
      toast.success("Product Updated Successfully!"); // 🔥 Hot Toast
      
      // Thoda delay taake user toast dekh sake
      setTimeout(() => {
        navigate('/AdminDashboard');
      }, 1500);
    } catch (err) {
      toast.error("Update Failed! Please try again."); // 🔥 Hot Toast
    } finally {
      setIsUpdating(false);
    }
  };

  // --- Loader Screen ---
  if (loading) {
    return (
      <div className="update-page-wrapper">
         <div className="ap-loader" style={{ borderTopColor: '#f25b19', width: '50px', height: '50px' }}></div>
      </div>
    );
  }

  return (
    <div className="update-page-wrapper">
      {/* 🔥 Toaster Component */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="update-card">
        {/* --- Back Navigation --- */}
        <button className="back-nav-btn" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>

        <div className="form-header">
          <div className="header-icon-box">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <h2>Edit Product Details</h2>
          <p>Update your inventory information instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="update-form">
          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Describe the features..."
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Price (USD)</label>
              <div className="price-input-wrapper">
                <span className="unit-label">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Stock Count</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setstock(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={() => navigate(-1)} disabled={isUpdating}>
              Discard Changes
            </button>
            <button type="submit" className="primary-btn" disabled={isUpdating}>
              {isUpdating ? (
                <div className="ap-loader"></div> 
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  Save Updates
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;