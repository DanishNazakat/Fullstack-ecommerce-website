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
import { getProduct } from "../../../services/products/getProduct"
import { Link } from 'react-router-dom'

function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct()
        console.log(response , " line 45")

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
      <h2>All Produc</h2>

      
      {products.map((item)=>{
        return(
          <div key={item._id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <Link to={`UpdateProduct/`+item._id}>Edit </Link>
          </div>
        );
      })}

    </div>
  )
}

export default Home