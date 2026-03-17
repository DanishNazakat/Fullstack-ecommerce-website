import React, { useState, useEffect } from 'react';
import { getProduct } from "../../../services/products/getProduct";
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  // Products ko hamesha empty array se initialize karein
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true); // Loading state zaroori hai

  const navigate = useNavigate();

  const handleDirectCheckout = (product) => {
    navigate("/checkout", {
      state: {
        cartItems: [product],
        total: product.price
      }
    });
  };

  const categoryData = [
    { name: 'All', icon: 'grid_view' },
    { name: 'Electronics', icon: 'devices' },
    { name: 'Fashion', icon: 'checkroom' },
    { name: 'Home', icon: 'chair' },
    { name: 'Beauty', icon: 'face_6' }
  ];

  const profile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct();
        // Backend se data 'getProduct' ya 'products' kis key mein aa raha hai?
        // Humne yahan safely handle kiya hai:
        const data = response.getProduct || response.products || response;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(`Products not Found ${err.message}`);
        setProducts([]); // Error par empty array rakhein
      } finally {
        setLoading(false); // Data load hone ke baad loading band
      }
    };
    fetchData();
  }, []);

  // Filter logic ko safe banane ke liye optional chaining use karein
  const filteredProducts = (products || []).filter((item) => {
    if (!item) return false;

    const matchesCategory = activeCategory === 'All' ||
      item.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-wrapper">
      {/* --- Navbar --- */}
      <nav className="main-nav">
        <div className="nav-content container">
          <div className="logo-section" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
            <span className="logo-name">ShopModern</span>
          </div>

          <div className="search-container">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="nav-icon-btn" onClick={profile}>
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container main-content">
        {/* --- Hero Banner Section --- */}
        <section className="hero-banner">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070"
            alt="Hero Banner"
            className="hero-img"
          />
          <div className="hero-text">
            <span className="hero-tag">New Collection 2026</span>
            <h1>Experience the Future of E-commerce</h1>
            <p>Get exclusive deals and personalized recommendations on top brands.</p>
            <button className="hero-btn">Shop Now</button>
          </div>
        </section>

        {/* --- Shop by Category Section --- */}
        <section className="category-section">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <button className="view-all-btn">View All</button>
          </div>

          <div className="category-grid-layout">
            {categoryData.map((cat) => (
              <div
                key={cat.name}
                className={`category-card ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <div className="category-icon-wrapper">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <span className="category-card-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Product Grid --- */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading amazing products...</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item._id} className="product-card">
                  <div className="card-img-box">
                    {/* Cloudinary URL handling */}
                    <img src={item.image || "https://via.placeholder.com/300"} alt={item.name} />
                    <span className="img-category-tag">{item.category}</span>
                  </div>
                  <div className="card-info">
                    <span className="item-cat-label">{item.category}</span>
                    <h3 className="item-name">{item.name}</h3>
                    <div className="card-footer-row">
                      <span className="item-price">${item.price}</span>
                      <div className="action-btns">
                        <button className="add-btn" onClick={() => handleDirectCheckout(item)}>
                          <span className="material-symbols-outlined">add_shopping_cart</span>
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <span className="material-symbols-outlined">inventory_2</span>
                <h3>No products found</h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <footer class="main-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <div class="logo-section">
              <div class="logo-icon">
                <span class="material-symbols-outlined">shopping_bag</span>
              </div>
              <span class="logo-name">ShopModern</span>
            </div>
            <p class="brand-desc">
              Experience the future of shopping with our curated collection of premium products.
            </p>
            <div class="social-links">
              <a href="#" class="social-icon"><span class="material-symbols-outlined">share</span></a>
              <a href="#" class="social-icon"><span class="material-symbols-outlined">public</span></a>
              <a href="#" class="social-icon"><span class="material-symbols-outlined">chat</span></a>
            </div>
          </div>

          <div class="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Discounted</a></li>
              <li><a href="#">Store Finder</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Help</h4>
            <ul>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="container bottom-flex">
            <p>© 2026 ShopModern. All rights reserved.</p>
            <div class="bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;