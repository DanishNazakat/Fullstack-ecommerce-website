import React from 'react'
import { useState , useEffect } from 'react'
import {getProduct} from "../../services/auth/getProduct"
function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct();

        console.log(response)


        setProducts((prevProducts) => [
          ...prevProducts,
          ...response
        ])
        console.log(products)
        console.log(response);
      } catch (err) {
        console.log(`Products not Found ${err.message}`)
      }
    }
    fetchData()
  }, [])
  return (
    <div>home</div>
  )
}

export default Home