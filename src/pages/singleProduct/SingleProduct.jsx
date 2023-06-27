
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './SingleProduct.scss';

function SingleProduct() {

  // const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});
  const [downloaded, setDownloaded] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then(result => result.json())
      .then(data => {
        setData(data);
        setDownloaded(data.downloaded);
      })
      .catch(error => {
        throw new Error('Failed to fetch products: ' + error.message);
      });
  }, [id]);


  const downloadedGame = async () => {
    try {
      const response = await fetch(`http://localhost:5000/downloade/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ downloaded: downloaded + 1 }),
      });
      const data = await response.json();
     
      console.log('Downloaded value updated:', data.downloaded
      );
    } catch (error) {
      console.error('Failed to update downloaded value:', error);
    }
  };
  
  return (
    <div className='SingleProduct'>
      <i className='fa-sharp fa-solid fa-arrow-left' onClick={() => navigate('/')}></i>

      <div className='container'>
        <div className='box'>
          <h2>{data.productName}</h2>
          <p className='desc'>{data.description}</p>
          <div className='btn-box'>
            <button onClick={downloadedGame}>Buy {data.price} $</button>
            <button >
              Create <i className='fa-sharp fa-solid fa-cart-shopping'></i>
            </button>
          </div>
        </div>
        <div className='box'>
          <div className='imgBox'>
            <img src={data.image} alt='img' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;


