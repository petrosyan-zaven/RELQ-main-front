// import React from 'react'
// import useCategories from '../../hook/useCategorye'
// import './AddCat.scss'

// function AddCat() {

//   // const data = useCategories();
//   const { data, setData } = useCategories();
//   const token = localStorage.getItem('token') || sessionStorage.getItem('token');


//   async function deleteCat(cat) {
//     try {
//       const response = await fetch(`http://localhost:5000/deletecat/${cat.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//         },
//         body: JSON.stringify({ id: cat.id }),
//       });

//       if (!response.ok) {
//         throw new Error('Response was not ok');
//       }
  
//       setData((item) => item.filter((category) => category.id !== cat.id));
//     } catch (error) {
//       console.error('Error deleting the product:', error);
//     }
//   }
  
//   const onInputChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };
  

//   return (
//     <form className='AddCat'>
//       {
//         data?.map((category, index) => {
//           return (
//             <div className='box' key={index}>
//               <input type='text' value={category.categoryName} onChange={(e) => onInputChange(e,index)}/>
//               <button className='delete' onClick={() => deleteCat(category)}>X</button>
//             </div>
//           )
//         })
//       }
//       <button>edit</button>
//     </form>
//   )
// }

// export default AddCat

import React, { useState } from 'react';
import useCategories from '../../hook/useCategorye';
import './AddCat.scss';

function AddCat() {
  const [ data, setData ] = useCategories();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [editedData, setEditedData] = useState({});



  async function deleteCat(cat) {
    try {
      const response = await fetch(`http://localhost:5000/deletecat/${cat.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: cat.id }),
      });

      if (!response.ok) {
        throw new Error('Response was not ok');
      }

      setData((item) => item.filter((category) => category.id !== cat.id));
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  }



  const onInputChange = (e, index) => {
    const updatedData = [...data];
    updatedData[index][e.target.name] = e.target.value;
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
    setData(updatedData);
  };



  async function editCat(cat) {
    
    try {
      const response = await fetch(`http://localhost:5000/editcat/${cat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cat),
      });

      if (!response.ok) {
        throw new Error('Response was not ok');
      }

      // Update the data if necessary
    } catch (error) {
      console.error('Error editing the category:', error);
    }
  }

  // const onChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };



  const onSubmit = (e) => {
    e.preventDefault();

    const headers = {
      "content-type": "application/json",
    };

    setData([{
      categoryName: "",

    }]);
   

    fetch("http://localhost:5000/addcat", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      
      .catch((error) => {
        console.error("Error adding the task:", error);
      });
  };


  return (
    <>
      <form className='AddCat' onSubmit={onSubmit}>
        <input type='text' placeholder='add category' />
        <button className='AddBtn'>Add</button>
      </form>

      <form className='EditCat' onSubmit={(cat) => editCat(cat)}>
        {data?.map((category, index) => {
          return (
            <div className='box' key={index}>
              <input
                type='text'
                name='categoryName'
                value={category.categoryName}
                onChange={(e) => onInputChange(e, index)}
              />
              <button className='delete' onClick={() => deleteCat(category)}>
                X
              </button>
            </div>
          );
        })}
        <button>Edit</button>
      </form>
    </>
  );
}

export default AddCat;


