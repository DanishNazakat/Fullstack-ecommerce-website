import React, { useState, useEffect } from 'react';
import { getAllOrders } from "../../../services/products/getOrder";
import { updateOrderStatus } from "../../../services/products/updateOrder";
import toast, { Toaster } from 'react-hot-toast'; // 🔥 Added
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
      loading: `Updating status to ${newStatus}...`,
      success: () => {
        fetchOrders();
        return <b>Status updated to ${newStatus}!</b>;
      },
      error: <b>Update failed. Please try again.</b>,
    });
  };

  return (
    <div className="om-viewport">
      <Toaster position="top-right" />
      
      <div className="om-header">
        <div className="om-title-box">
          <span className="material-symbols-outlined">package_2</span>
          <div>
            <h1>Order Management</h1>
            <p>Track and update customer deliveries</p>
          </div>
        </div>
        <div className="om-stats">
          <div className="om-stat-item">
            <span className="om-stat-label">Total Orders</span>
            <span className="om-stat-value">{orders.length}</span>
          </div>
        </div>
      </div>

      <div className="om-card">
        <div className="om-table-wrapper">
          <table className="om-table">
            <thead>
              <tr>
                <th>Order & Shipping</th>
                <th>Purchased Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th className="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="om-loader-cell"><div className="ap-loader"></div></td></tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="om-order-info">
                      <span className="om-id">#{order._id.slice(-8).toUpperCase()}</span>
                      <p className="om-address">
                        <span className="material-symbols-outlined">location_on</span>
                        {order.address}
                      </p>
                    </td>
                    <td className="om-items-cell">
                      <div className="om-items-list">
                        {order.items.map((i, idx) => (
                          <span key={idx} className="om-item-tag">{i.name}</span>
                        ))}
                      </div>
                    </td>
                    <td className="om-price">₹{order.totalAmount}</td>
                    <td>
                      <span className={`om-badge om-badge-${order.status?.toLowerCase() || 'pending'}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="om-action-wrapper">
                        <select 
                          className="om-status-select"
                          value={order.status} 
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="om-empty">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;