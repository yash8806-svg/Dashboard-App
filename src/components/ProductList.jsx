import React from 'react'
import { useGetProductsQuery } from '../api/apiSlice'

const ProductList = () => {
const {data : products = []} = useGetProductsQuery();

  return (
    <>
    <div className="input">
        <input type="text" 
        placeholder='Search...' />
    </div>
       {products.length === 0 ? (
        <p>No producst found!</p>
       ):(
        products.map((product)=>(
            <div key={product.id} className="product-list">
                <img style={{width:"200px"}} src={product.image} alt="product-image" />
                  <h1>Price:${product.price}</h1>
                  <h2>Category: {product.category}</h2>
                  <h3>{product.title}</h3>
                  <h4>Rating: (Rate:{product.rating.rate},count{product.rating.count})</h4>
                </div>
        ))
       )}
    </>
  )
}

export default ProductList
