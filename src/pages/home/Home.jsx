import React from 'react';
import useProducts from '../../hook/useProducts';
import { Link } from 'react-router-dom';

function Home() {

  const products = useProducts();


  return (
    <div className='Home'>
      {
        products?.map((product, index) => {
          return (
            <div key = {index} className='cart'>
              <Link to = {'/prod/' + product.id } >
                {product.productName}
                {/* <img src={product?.image} alt='' /> */}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home