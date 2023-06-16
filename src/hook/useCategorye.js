
import { useState, useEffect } from "react";

const apiUrl = "http://localhost:5000/categories" ;

 function useCategories() {

    const [data, setData] = useState();

    useEffect(()=>{
      fetch(apiUrl)
        .then(result => result.json())
        .then(data => setData(data))
    },[])
    return data;
}

export default useCategories;