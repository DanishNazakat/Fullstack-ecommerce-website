import React, { useState, useEffect } from 'react';
import { getAllOrders } from "../../../services/products/getOrder";
import { updateOrderStatus } from "../../../services/products/updateOrder";
import './OrderManagement.css'; 

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(Array.isArray(response) ? response : response.orders);
    } catch (err) {
      console.error("Orders load nahi ho sakay", err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      alert("Status updated successfully!");
      fetchOrders(); // List refresh karne ke liye
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>📦 Order Management</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order Details</th>
            <th>Items</th>
            <th>Total</th>
            <th>Current Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <tr key={order._id}>
              <td><small>ID: {order._id}</small><br/>{order.address}</td>
              <td>{order.items.map(i => i.name).join(", ")}</td>
              <td className="total-price">${order.totalAmount}</td>
              <td>
                <span className={`status-badge status-${order.status}`}>
                  {order.status || 'Pending'}
                </span>
              </td>
              <td>
                {/* Status Change Dropdown */}
                <select 
                  defaultValue={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={{padding: '5px', borderRadius: '4px'}}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;