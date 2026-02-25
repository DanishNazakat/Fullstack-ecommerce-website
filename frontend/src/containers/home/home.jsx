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
import { getProduct } from "../../services/auth/getProduct"

function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct()
        console.log(response)

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
      <h2>All Products</h2>

      {products && products.length > 0 ? (
        products.map((item) => (
          <div key={item._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
            borderRadius: "8px"
          }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> {item.price}</p>
          </div>
        ))
      ) : (
        <p>No Products Found</p>
      )}

    </div>
  )
}

export default Home