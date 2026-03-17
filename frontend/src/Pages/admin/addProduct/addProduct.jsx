import React, { useState } from 'react';
import { addProduct } from '../../../services/products/addProduct';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState(null); // Image file state
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Pehli file select karna
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormData banana (Postman ki tarah)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    
    if (file) {
      formData.append("image", file); // Backend 'upload.single("image")' se match hona chahiye
    }

    try {
      const response = await addProduct(formData);
      if (response.success) {
        alert("Product with image added successfully!");
        navigate("/AdminDashboard");
      }
    } catch (err) {
      alert("Error adding product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Add New Product (with Image)</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Product Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required style={styles.input} />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Uploading to Cloudinary..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  formGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '12px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default AddProduct;