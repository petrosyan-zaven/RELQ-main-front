import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";





function SingleProduct() {

  const { id } = useParams() ;

  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then(result => result.json())
      .then(data => setData(data))
      .catch(error => {
        throw new Error("Failed to fetch products: " + error.message);
      });
  }, [id]);



  return (
    <div className='SingleProduct'>
      <h2>{data.productName}</h2>
    </div>
  )
}

export default SingleProduct