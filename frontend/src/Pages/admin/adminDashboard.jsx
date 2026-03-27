import React, { useState, useEffect } from 'react';
import { getProduct } from "../../services/products/getProduct";
import { deleteProduct } from "../../services/products/deleteProduct";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await getProduct();
      const data = response.products || response.getProduct || response;
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Confirm Delete? 
        <button 
          onClick={() => {
            toast.dismiss(t.id);
            executeDelete(id);
          }}
          style={{ marginLeft: '10px', background: '#ef4444', color: '#white', border: 'none', padding: '3px 10px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Yes
        </button>
      </span>
    ));
  };

  const executeDelete = async (id) => {
    const deletePromise = deleteProduct(id);
    toast.promise(deletePromise, {
      loading: 'Deleting...',
      success: () => {
        setProducts(products.filter((item) => item._id !== id));
        return 'Product Deleted';
      },
      error: 'Error deleting product',
    });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Toaster position="top-right" />
      
      {/* Sidebar Section */}
      <aside className="sidebar-glass">
        <div className="brand-area">
          <div className="brand-logo">SM</div>
          <h2 className="brand-name">ShopModern</h2>
        </div>
        
        <nav className="nav-menu">
          <Link to="/AdminDashboard" className="nav-item active">
            <span className="material-symbols-outlined">grid_view</span>
            <span>Inventory</span>
          </Link>
          <Link to="/OrderManagement" className="nav-item">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Orders</span>
          </Link>
          <Link to="/UserManagement" className="nav-item">
            <span className="material-symbols-outlined">group_work</span>
            <span>Customers</span>
          </Link>
        </nav>

       
      </aside>

      {/* Main Container */}
      <main className="main-viewport">
        <header className="top-bar">
          <div className="search-box-wrapper">
            <span className="material-symbols-outlined">search</span>
            <input 
              type="text" 
              placeholder="Quick search products..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/AddProduct" className="add-cta">
            <span className="material-symbols-outlined">add</span>
            New Product
          </Link>
        </header>

        <div className="dashboard-body">
          <div className="stats-row">
            <div className="stat-card">
              <p>Total Inventory</p>
              <h3>{products.length} Items</h3>
            </div>
            <div className="stat-card">
              <p>Active Categories</p>
              <h3>{[...new Set(products.map(p => p.category))].length}</h3>
            </div>
          </div>

          <div className="data-table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Inventory</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="loader-cell"><div className="ap-loader"></div></td></tr>
                ) : (
                  filteredProducts.map((item) => (
                    <tr key={item._id}>
                      <td className="product-col">
                        <img src={item.image || "https://placehold.co/50"} alt="" />
                        <div>
                          <p className="p-title">{item.name}</p>
                          <span className="p-id">#{item._id.slice(-6)}</span>
                        </div>
                      </td>
                      <td><span className="pill-cat">{item.category}</span></td>
                      <td>
                        <div className="stock-wrapper">
                          <div className={`stock-indicator ${item.stock < 5 ? 'critical' : ''}`}></div>
                          <span>{item.stock} in stock</span>
                        </div>
                      </td>
                      <td className="p-price">₹{item.price}</td>
                      <td className="text-end">
                        <div className="btn-group">
                          <Link to={`/UpdateProduct/${item._id}`} className="action-btn edit" title="Edit Product">
                            <span className="material-symbols-outlined">stylus</span>
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="action-btn delete" title="Remove Product">
                            <span className="material-symbols-outlined">delete_sweep</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;