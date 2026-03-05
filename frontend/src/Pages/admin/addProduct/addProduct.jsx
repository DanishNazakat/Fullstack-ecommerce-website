// src/components/SignupForm.jsx
import React, { useState } from "react";
import { addProduct } from "../../../services/products/addProduct";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setstock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addProduct(name, description, price, category, stock);
      console.log("product response:", data);
     
        alert("add product successful!");
        navigate('/AdminDashboard')
      
    } catch (err) {
      console.error(err);
      alert(" failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
      />
      <input
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => setcategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="stock"
        value={stock}
        onChange={(e) => setstock(e.target.value)}
      />
      <button type="submit">Add product</button>
    </form>
  );
};

export default AddProduct;
