import React, { useState, useEffect } from 'react';
import { getProduct } from "../../services/products/getProduct";
import { deleteProduct } from "../../services/products/deleteProduct";
import { Link } from 'react-router-dom';
import "./style.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data Function
  const fetchData = async () => {
    try {
      const response = await getProduct();
      console.log("Backend Response:", response);

      // Aapka backend data 'getProduct' ya 'products' kis naam se bhej raha hai?
      // Uske mutabiq handle karein:
      const data = response.products || response.getProduct || response;
      setProducts(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error(`Products not Found: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product Deleted Successfully");
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  if (loading) return <div className="loading" style={{textAlign:'center', marginTop:'50px'}}>Loading Products...</div>;

  return (
    <div className="admin-dashboard-container" style={{ padding: '20px' }}>
      <div className="admin-nav" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Link to={"/AddProduct"} className='addProduct' style={styles.navLink}>Add New Product</Link>
        <Link to={"/OrderManagement"} className='addProduct' style={{ ...styles.navLink, background: '#f39c12' }}>View Orders</Link>
      </div>

      <h2>All Products List</h2>

      <div className="products-grid" style={styles.grid}>
        {products && products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className='products-card' style={styles.card}>
              
              {/* Image Display */}
              <div style={styles.imageWrapper}>
                {item.image ? (
                  <img src={item.image} alt={item.name} style={styles.img} />
                ) : (
                  <div style={styles.noImg}>No Image</div>
                )}
              </div>

              <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '5px 0' }}>{item.name}</h3>
                <p style={styles.desc}><strong>Desc:</strong> {item.description}</p>
                <p><strong>Price:</strong> <span style={{color: '#27ae60', fontWeight:'bold'}}>₹{item.price}</span></p>
                <p><small><strong>Category:</strong> {item.category} | <strong>Stock:</strong> {item.stock}</small></p>

                <div className="actions" style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <Link to={`/UpdateProduct/${item._id}`} style={styles.editBtn}>Edit</Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found. Please add some!</p>
        )}
      </div>
    </div>
  );
}

// Inline styles for quick fix (Aap isay CSS file mein bhi daal sakte hain)
const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  imageWrapper: {
    width: '100%',
    height: '250px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  noImg: {
    color: '#999',
    fontSize: '14px'
  },
  desc: {
    fontSize: '13px',
    color: '#666',
    height: '40px',
    overflow: 'hidden'
  },
  navLink: {
    padding: '10px 20px',
    color: 'white',
    backgroundColor: '#27ae60',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  editBtn: {
    padding: '5px 15px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px'
  },
  deleteBtn: {
    padding: '5px 15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default AdminDashboard;