import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const apiUrl = "http://localhost:5000/product/";



function useProducts() {

  const { id } = useParams() ;
  const [data, setData] = useState();

  useEffect(() => {
    fetch(apiUrl+id)
      .then(result => result.json())
      .then(data => setData(data))
      .catch(error => {
        throw new Error("Failed to fetch products: " + error.message);
      });
  }, [id]);


  return [data, setData];
}

export default useProducts;