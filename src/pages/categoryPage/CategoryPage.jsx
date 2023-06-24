import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import '../home/Home.scss'



function CategoryPage() {

  const { id } = useParams()
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/product/cat/${id}`)
      .then(result => result.json())
      .then(data => setData(data))
      .catch(error => {
        throw new Error("Failed to fetch products: " + error.message);
      });
  }, [id]);


  return (
    <div className='Home'>
                {
            data?.map((game, index) => {
              
              return (
                <div key={index} className='card'>
                <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                
                  <Link to={'/prod/'+ game.id}  className="item">                    
                    <img className='gameImg' src={game.image} alt={game.productName} />
                  </Link>
                  <button className='btn-bay' >{game.price}</button>
                </div>
              )
            })
          }
    </div>
  )
}

export default CategoryPage