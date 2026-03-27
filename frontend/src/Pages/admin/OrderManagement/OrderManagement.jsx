import React, { useState, useEffect } from 'react';
import { getAllOrders } from "../../../services/products/getOrder";
import { updateOrderStatus } from "../../../services/products/updateOrder";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './OrderManagement.css'; 

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      const data = Array.isArray(response) ? response : response.orders;
      setOrders(data || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updatePromise = updateOrderStatus(id, newStatus);
    toast.promise(updatePromise, {
      loading: `Updating to ${newStatus}...`,
      success: () => {
        fetchOrders();
        return <b>Status updated!</b>;
      },
      error: <b>Update failed.</b>,
    });
  };

  return (
    <div className="admin-layout">
      <Toaster position="top-right" />
      
      {/* Sidebar - Same as Dashboard */}
      <aside className="sidebar-glass">
        <div className="brand-area">
          <div className="brand-logo">SM</div>
          <h2 className="brand-name">ShopModern</h2>
        </div>
        
        <nav className="nav-menu">
          <Link to="/AdminDashboard" className="nav-item">
            <span className="material-symbols-outlined">grid_view</span>
            <span>Inventory</span>
          </Link>
          <Link to="/OrderManagement" className="nav-item active">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Orders</span>
          </Link>
          <Link to="/UserManagement" className="nav-item">
            <span className="material-symbols-outlined">group_work</span>
            <span>Customers</span>
          </Link>
        </nav>

      
      </aside>

      {/* Main Content Area */}
      <main className="main-viewport">
        <header className="top-bar">
          <div className="page-header-text">
            <h1>Order Management</h1>
            <p>Manage and track all customer purchases</p>
          </div>
          <div className="om-stats-pill">
            Active Orders: {orders.length}
          </div>
        </header>

        <div className="dashboard-body">
          <div className="data-table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Order ID & Address</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="loader-cell"><div className="ap-loader"></div></td></tr>
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-info-col">
                        <span className="om-id-badge">#{order._id.slice(-6).toUpperCase()}</span>
                        <div className="om-address-text">
                          <span className="material-symbols-outlined">location_on</span>
                          {order.address}
                        </div>
                      </td>
                      <td>
                        <div className="om-items-bundle">
                          {order.items.map((i, idx) => (
                            <span key={idx} className="om-item-pill">{i.name}</span>
                          ))}
                        </div>
                      </td>
                      <td className="om-price-text">₹{order.totalAmount}</td>
                      <td>
                        <span className={`status-pill pill-${order.status?.toLowerCase() || 'pending'}`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="text-end">
                        <select 
                          className="om-status-dropdown"
                          value={order.status} 
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="empty-msg">No active orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderManagement;