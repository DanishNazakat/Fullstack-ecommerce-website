import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder } from "../services/products/orderService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, total } = location.state || { cartItems: [], total: 0 };
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async () => {
    // 1. Auth Check
    if (!user) {
      toast.error("Please login to place an order!");
      return navigate("/login");
    }

    // 2. Validation Check (English)
    if (!address.trim() || !phone.trim()) {
      toast.error("Please provide a complete address and phone number.", {
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity || 1,
        price: item.price
      })),
      totalAmount: total,
      address: `${address} | Phone: ${phone}`,
    };

    // 3. Handling Order with Promise Toast
    try {
      const orderPromise = placeOrder(orderData);

      await toast.promise(orderPromise, {
        loading: 'Processing your order...',
        success: (res) => {
          if (res.success) {
            setTimeout(() => navigate("/"), 2000);
            return "Order placed successfully! Thank you.";
          }
          throw new Error("Order failed at checkout.");
        },
        error: "Could not place order. Please try again.",
      }, {
        success: {
          duration: 4000,
          icon: '🔥',
        },
      });

    } catch (err) {
      console.error(err);
      // Errors are handled by toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'}}>
        <div style={{textAlign: 'center'}}>
          <span className="material-symbols-outlined" style={{fontSize: '60px', color: '#cbd5e1'}}>shopping_cart_off</span>
          <h2 className="form-title" style={{marginTop: '20px'}}>Your checkout is empty</h2>
          <button className="place-order-btn" onClick={() => navigate("/")}>Return to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        
        <header className="checkout-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Cart
          </button>
          
          
        </header>

        <main className="checkout-grid">
          
          {/* Left Column: Shipping Information */}
          <section className="form-card">
            <h2 className="form-title">Shipping Information</h2>
            <p className="form-subtitle">Recipient: <strong>{user?.name || user?.email}</strong></p>

            <div className="input-group">
              <label className="input-label">Mobile Number</label>
              <div className="input-field-wrapper">
                <i className="material-symbols-outlined">call</i>
                <input 
                  className="large-input"
                  type="tel"
                  placeholder="03xx xxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Full Delivery Address</label>
              <div className="input-field-wrapper">
                <i className="material-symbols-outlined top-icon">location_on</i>
                <textarea 
                  className="large-textarea"
                  placeholder="Apartment, Street, Area, City..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="payment-info-box">
              <span className="material-symbols-outlined">payments</span>
              <div>
                <p style={{margin: 0, fontWeight: '800', fontSize: '12px', color: '#f25b19'}}>PAYMENT METHOD</p>
                <p style={{margin: 0, fontSize: '15px', fontWeight: '600'}}>Cash on Delivery (COD)</p>
              </div>
            </div>
          </section>

          {/* Right Column: Summary Card */}
          <aside className="summary-box">
            <h3 className="summary-header">Items in Order</h3>
            
            <div className="items-container">
              {cartItems.map((item, index) => (
                <div key={index} className="item-card">
                  <img src={item.image} alt={item.name} className="item-thumb" />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity || 1} • ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div className="total-line">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="total-line">
                <span>Shipping Fee</span>
                <span style={{color: '#22c55e', fontWeight: '700'}}>FREE</span>
              </div>
              
              <div className="grand-total-line">
                <span>Total Amount</span>
                <div className="price-tag">${total}</div>
              </div>

              <button 
                className="place-order-btn" 
                onClick={handleOrderSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm & Place Order"}
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default CheckoutPage;