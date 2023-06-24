
import React, { useState } from 'react';
import useProducts from '../../hook/useProducts';
import './ProductController.scss';

function ProductControll() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [data, setData] = useProducts();
  const [checkedItems, setCheckedItems] = useState([]);

  async function deleteGame(game) {
    try {
      const response = await fetch(`http://localhost:5000/deleteproduct/${game.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: game.id }),
      });

      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      setData((items) => items.filter((product) => product.id !== game.id));
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  }

  function handleCheckboxChange(game) {
    if (checkedItems.includes(game.id)) {
      setCheckedItems((items) => items.filter((itemId) => itemId !== game.id));
    } else {
      setCheckedItems((items) => [...items, game.id]);
    }
  }

  function removeChecked() {
    const filteredData = data.filter((game) => !checkedItems.includes(game.id));
    setData(filteredData);
    setCheckedItems([]);
  }

  return (
    <div className="ProductControll">
      
      {data?.map((game) => (
        <div className="box" key={game.id}>
        <input className='chack' type="checkbox" checked={checkedItems.includes(game.id)} onChange={() => handleCheckboxChange(game)} />
          <div className="imgBox">
            <img src={game.image} alt={game.productName} />
          </div>
          <h3>{game.productName}</h3>
          <button onClick={() => deleteGame(game)}>X</button>
        </div>
      ))}
      <button onClick={removeChecked}>Remove Checked</button>
    </div>
  );
}

export default ProductControll;
