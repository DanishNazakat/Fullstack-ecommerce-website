// // src/components/SignupForm.jsx
// import React, { useState } from "react";
// import {Signup} from "../../services/auth/auth";
// import { useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await Signup(fname, lname, email, password);
//       console.log("Signup response:", data);
//       alert("Signup successful!");
      
//       navigate('/login')
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="First Name"
//         value={fname}
//         onChange={(e) => setFname(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Last Name"
//         value={lname}
//         onChange={(e) => setLname(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignupForm;

import React, { useState } from "react";
import { Signup } from "../../services/auth/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast"; // 1. Toast import kiya
import "./SignupForm.css"; 
import shoppingImg from "../../assets/unnamed.png";

const SignupForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Passwords match check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!"); // 2. Alert ki jagah toast
      return;
    }

    // Loading start (Optional: Aap button ko disable karne ke liye use kar sakte hain)
    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await Signup(fname, lname, email, password);
      
      // Loading toast ko success mein badlein
      toast.success("Signup successful! Welcome to ShopModern.", {
        id: loadingToast,
      });

      navigate('/login');
    } catch (err) {
      console.error(err);
      
      // Backend se agar koi specific error message aa raha ho to wo dikhayein
      const errorMsg = err.response?.data?.message || "Signup failed! Please try again.";
      
      toast.error(errorMsg, {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="page-wrapper">
      {/* Left Section */}
      <div className="brand-section">
        <div className="logo-top">
          <div className="logo-box">🛍️</div>
          <span className="logo-text">ShopModern</span>
        </div>
        
        <div className="hero-content">
          <div className="image-circle">
            <img src={shoppingImg} alt="Shopping Illustration" className="i" />
          </div>
          <h1>Join Our Shopping Community</h1>
          <p>Experience the future of e-commerce. Create an account to unlock exclusive deals and personalized recommendations.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="form-section">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p className="subtitle">Get started with your free account today.</p>

          <form onSubmit={handleSubmit} className="actual-form">
            <div className="input-row">
              <div className="input-field">
                <label>First Name</label>
                <div className="input-wrapper">
                  <span className="icon">👤</span>
                  <input type="text" placeholder="John" value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div>
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <div className="input-wrapper">
                  <span className="icon">👤</span>
                  <input type="text" placeholder="Doe" value={lname} onChange={(e) => setLname(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="icon">✉️</span>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="input-row">
              <div className="input-field">
                <label>Password</label>
                <div className="input-wrapper">
                  <span className="icon">🔒</span>
                  <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
              <div className="input-field">
                <label>Confirm</label>
                <div className="input-wrapper">
                  <span className="icon">🔄</span>
                  <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
            </div>

            <button type="submit" className="create-btn">Create Account</button>
          </form>

          <p className="footer-text">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;