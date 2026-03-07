// import React from 'react'
// import { useState , useEffect } from 'react'
// import {getProduct} from "../../services/auth/getProduct"
// function Home() {
//   const [products, setProducts] = useState([])
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getProduct();

//         console.log(response)


//         setProducts((prevProducts) => [
//           ...prevProducts,
//           ...response
//         ])
//         console.log(products)
//         console.log(response);
//       } catch (err) {
//         console.log(`Products not Found ${err.message}`)
//       }
//     }
//     fetchData()
//   }, [])
//   return (
//     <div>home</div>
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react'
import { getProduct } from "../../services/products/getProduct"
import { deleteProduct } from "../../services/products/deleteProduct";
import { Link } from 'react-router-dom'
import "./style.css"
function AdminDashboard() {
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      alert("Product Deleted Successfully");

      // 👇 list refresh
      setProducts(products.filter((item) => item._id !== id));

    } catch (error) {

      console.error(error);
      alert("Delete Failed");

    }
  };
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct()
        console.log(response, " line 45")

        // 👇 IMPORTANT — sirf array set karo
        setProducts(response.getProduct)

      } catch (err) {
        console.log(`Products not Found ${err.message}`)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Link to={"/AddProduct"} className='addProduct'>add Product</Link>
      <h2>All Produc</h2>


      {products.map((item) => {
        return (
          <div key={item._id} className='products'>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.category}</p>
            <p>{item.stock}</p>
            <Link to={`/UpdateProduct/` + item._id} className='editButton'>Edit </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        );
      })}

    </div>
  )
}

export default AdminDashboard