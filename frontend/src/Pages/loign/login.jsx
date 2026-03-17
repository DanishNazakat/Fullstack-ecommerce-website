// // src/components/LoginForm.jsx

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../../services/auth/login";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await loginUser({ email, password });
//       console.log("user data" , data)
//       if (data.user.role === "admin") {
//         navigate("/AdminDashboard");
//       } else {
//         navigate("/");
//       }

//     } catch (error) {
//       console.log("Login failed", error);
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div style={{ marginTop: "100px", textAlign: "center" }}>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div style={{ marginTop: "10px" }}>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div style={{ marginTop: "10px" }}>
//           <button type="submit">Login</button>
//         </div>
//       </form>

//       <p style={{ marginTop: "10px" }}>
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//       </p>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/auth/login";
import "./LoginForm.css"; // CSS file link
import cartimage from "../../assets/login.avif"
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast"

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("user data", data);
      login(data.user);
        toast.success(data.message, {
      position: "top-center",
      duration: 1500
    });
      setTimeout(() => {
      if (data.user.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/");
      }
    }, 2000);
    } catch (error) {
      console.log("Login failed", error);
      toast.error("Invalid Email or Password", { position: "top-center",  duration: 1000 })
    }
  };

  return (
    <div className="page-wrapper">
      {/* Left Side: Branding (Hidden on mobile) */}
      <div className="brand-section">
        <div className="logo-top">
          <div className="logo-box">🛍️</div>
          <span className="logo-text">ShopModern</span>
        </div>

        <div className="hero-content">
          <div className="image-circle">
            {/* Illustration Image */}
            <img src={cartimage} alt="Login Illustration" />
          </div>
          <h1>Welcome Back to Our Store</h1>
          <p>Experience the next generation of online shopping with personalized deals and lightning-fast checkout.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="form-section">
        <div className="login-card">
          <div className="mobile-logo">
            <div className="logo-box">🛍️</div>
            <span className="logo-text">ShopModern</span>
          </div>

          <div className="card-header">
            <h3>Login to your account</h3>
            <p>Please enter your details to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="actual-form">
            <div className="input-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="icon">✉️</span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-field">
              <div className="label-row">
                <label>Password</label>
              </div>
              <div className="input-wrapper">
                <span className="icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>



            <button type="submit" className="login-btn">Login to Account</button>
          </form>

          {/* <div className="divider"><span>OR CONTINUE WITH</span></div>

          <div className="social-grid">
            <button className="social-btn">Google</button>
            <button className="social-btn">Facebook</button>
          </div> */}

          <p className="signup-link-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;