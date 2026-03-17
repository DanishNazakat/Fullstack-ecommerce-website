import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import { getMyOrders } from "../../../services/products/getOrderSevices"; 
import toast from "react-hot-toast";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook initialize karein

  const backupImg = "https://placehold.co/150x150/f25b19/white?text=Product";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      if (res.success) {
        setOrders(res.orders);
      }
    } catch (err) {
      toast.error("Orders load karne mein masala hua");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="oh-page-bg">
      <main className="oh-container">
        
        {/* Back Button & Header */}
        <div className="oh-top-nav">
          <button className="oh-back-btn" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
        </div>

        <div className="oh-header">
          <h1>Order History</h1>
          <p>
            <span className="material-symbols-outlined">history</span>
            You have {orders.length} orders in your account
          </p>
        </div>

        {/* Orders List */}
        <div className="oh-list">
          {orders.length === 0 ? (
            <div className="oh-empty-state">
              <div className="oh-empty-icon">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h3>No orders yet</h3>
              <p>Looks like you haven't placed any orders yet.</p>
              <button className="oh-btn-primary" onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="oh-card">
                {/* ... (Baqi card ka code wahi rahega jo pehle tha) ... */}
                <div className="oh-card-top">
                  <div className="oh-order-meta">
                    <div className="oh-meta-item">
                      <label>Order ID</label>
                      <span>#{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="oh-divider-v"></div>
                    <div className="oh-meta-item">
                      <label>Date Placed</label>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`oh-status-badge status-${order.status?.toLowerCase()}`}>
                    <span className="oh-pulse"></span>
                    {order.status}
                  </div>
                </div>

                <div className="oh-items-section">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="oh-item-row">
                      <div className="oh-item-left">
                        <div className="oh-img-box">
                          <img 
                            src={item.product?.image || backupImg} 
                            alt={item.product?.name}
                            onError={(e) => e.target.src = backupImg}
                          />
                        </div>
                        <div className="oh-item-details">
                          <h4>{item.product?.name || "Product Unavailable"}</h4>
                          <p>Qty: {item.quantity} • Price: ${item.price}</p>
                        </div>
                      </div>
                      <div className="oh-item-price">
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="oh-card-bottom">
                  <div className="oh-total-info">
                    <span className="oh-total-label">Total Amount</span>
                    <span className="oh-total-value">${order.totalAmount}</span>
                  </div>
                  <div className="oh-actions">
                    <button className="oh-btn-outline">View Details</button>
                    <button className="oh-btn-primary oh-btn-track">
                      <span className="material-symbols-outlined">local_shipping</span>
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;