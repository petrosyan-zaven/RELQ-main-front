import { useState, useEffect } from "react";

const apiUrl = "http://localhost:5000/products";

function useProducts() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(apiUrl)
      .then(result => result.json())
      .then(data => setData(data))
      .catch(error => {
        throw new Error("Failed to fetch products: " + error.message);
      });
  }, []);


  return [data, setData];
}

export default useProducts;
