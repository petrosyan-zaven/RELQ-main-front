
import React, { useState } from "react";
import useProducts from "../../hook/useProducts";
import { Link } from "react-router-dom";
import "./Home.scss";


function Home() {

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userId =  localStorage.getItem('id') || sessionStorage.getItem('id');
  const [data] = useProducts();
  const [ card, setCard ] = useState({
    userId: '',
    productId:''
  })

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   function addBasket(game) {
    
    try {
      const response =  fetch(`http://localhost:5000/addCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        // body: JSON.stringify({userId: Number(userId), product_id: game.id}),
        body: JSON.stringify({userId: Number(userId), product_id: game.id}),
      });
      setCard({
        userId,
        product_id: game.id
      });
      console.log(card);
      if (!response.ok) {
        throw new Error('Response was not ok');
      }

    } catch (error) {
      console.error('Error editing the category:', error);
    }
  }

  const downloadeGame = async (e) => {
    // const downloaded = e.downloaded;
    try {
      const response = await fetch(`http://localhost:5000/downloade/${e.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(  e.downloade + 1 ),
      });
      const data = await response.json();
      console.log('Downloaded value updated:', data.downloaded
      );
    } catch (error) {
      console.error('Failed to update downloaded value:', error);
    }
    
  }


  return (
   
    <div className="Home">
      {currentItems?.map((game, index) => {
        return (
          <div key={index} className="card">
            <i className="fa-sharp fa-solid fa-cart-shopping" onClick={() => addBasket(game)}></i>

            <Link to={"/prod/" + game.id} className="item">
              <img className="gameImg" src={game.image} alt={game.productName} />
            </Link>
            <button className="btn-bay" onClick={() => downloadeGame(game)}>{game.price}</button>
          </div>
        );
      })}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
    
  );
}

export default Home;


// import React, { useState, useEffect } from "react";
// import useProducts from "../../hook/useProducts";
// import { Link } from "react-router-dom";
// import "./Home.scss";

// function Home() {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//   const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
//   const [data] = useProducts();
//   const [card, setCard] = useState({
//     userId: "",
//     productId: "",
//   });

//   const itemsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const currentItems = data?.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(data?.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     async function addBasket(game) {
//       try {
//         const response = await fetch(`http://localhost:5000/addCart/`, {
//           method: "POST",
//           headers: {
//             // 'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(game),
//         });
//         setCard({
//           userId,
//           product_id: game.id,
//         });
//         console.log(card);
//         if (!response.ok) {
//           throw new Error("Response was not ok");
//         }

//         // Update the data if necessary
//       } catch (error) {
//         console.error("Error editing the category:", error);
//       }
//     }

//     // Call the addBasket function with the updated userId
//     if (userId) {
//       addBasket(card);
//     }
//   }, [userId, card, token]);

//   return (
//     <div className="Home">
//       {currentItems?.map((game, index) => {
//         return (
//           <div key={index} className="card">
//             <i className="fa-sharp fa-solid fa-cart-shopping" onClick={() => addBasket(game)}></i>

//             <Link to={"/prod/" + game.id} className="item">
//               <img className="gameImg" src={game.image} alt={game.productName} />
//             </Link>
//             <button className="btn-bay">{game.price}</button>
//           </div>
//         );
//       })}
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             className={pageNumber === currentPage ? "active" : ""}
//             onClick={() => handlePageChange(pageNumber)}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


// import React, { useEffect, useState } from "react";
// import useProducts from "../../hook/useProducts";
// import { Link } from "react-router-dom";
// import "./Home.scss";

// function Home() {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//   const id = localStorage.getItem("id") || sessionStorage.getItem("userId");
//   const [data] = useProducts();
//   const [card, setCard] = useState({
//     userId: "",
//     product_id: "",
//   });

//   const userId = Number(id);

//   console.log(typeof userId);

//   const itemsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const currentItems = data?.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(data?.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };


  // function addBasket (game) {
  //   // const token = localStorage.getItem("token");

  //   const headers = {
  //     "content-type": "application/json",
  //   };

  //   if (token) {
  //     headers["Authorization"] = "Bearer " + token;
  //   }

  //   setCard({ userId: userId, product_id: game.id });
  //   console.log(card);
  //   fetch("http://localhost:5000/addCart", {
  //     method: "POST",
  //     headers: headers, // Use the headers object defined here
  //     body: JSON.stringify(card),
  //   })
  
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(" error adding the game:", error);
  //     });
  // };


  // const addBasket = useMemo(() => (game) => {
  //   // const token = localStorage.getItem("token");

  //   const headers = {
  //     "content-type": "application/json",
  //   };

  //   if (token) {
  //     headers["Authorization"] = "Bearer " + token;
  //   }

  //   setCard({ userId: userId, product_id: game.id });
  //   console.log(card);
  //   fetch("http://localhost:5000/addCart", {
  //     method: "POST",
  //     headers: headers, // Use the headers object defined here
  //     body: JSON.stringify(card),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(" error adding the game:", error);
  //     });
  // }, [ userId]);


//   return (
//     <div className="Home">
//       {currentItems?.map((game, index) => {
//         return (
//           <div key={index} className="card">
//             <i className="fa-sharp fa-solid fa-cart-shopping" onClick={(e) => addBasket(game)}></i>

//             <Link to={"/prod/" + game.id} className="item">
//               <img className="gameImg" src={game.image} alt={game.productName} />
//             </Link>
//             <button className="btn-bay">{game.price}</button>
//           </div>
//         );
//       })}
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             className={pageNumber === currentPage ? "active" : ""}
//             onClick={() => handlePageChange(pageNumber)}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


// import React, { useState } from "react";
// import useProducts from "../../hook/useProducts";
// import { Link } from "react-router-dom";
// import "./Home.scss";

// function Home() {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//   const userId = localStorage.getItem("id") || sessionStorage.getItem("id");
//   const [data] = useProducts();
//   const [card, setCard] = useState({
//     userId: "",
//     productId: ""
//   });

//   const itemsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const currentItems = data?.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(data?.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   function addBasket(game) {
//     try {
//       const response = fetch(`http://localhost:5000/addCart`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ userId: Number(userId), product_id: game.id }),
//       });
//       setCard({
//         userId,
//         product_id: game.id
//       });
//       console.log(card);
//       if (!response.ok) {
//         throw new Error('Response was not ok');
//       }
//     } catch (error) {
//       console.error('Error editing the category:', error);
//     }
//   }

//   const downloadGame = async (game) => {
//     try {
//       const response = await fetch(`http://localhost:5000/download/${game.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ downloaded: game.downloaded + 1 }),
//       });
//       const data = await response.json();
//       console.log('Downloaded value updated:', data.downloaded);
//     } catch (error) {
//       console.error('Failed to update downloaded value:', error);
//     }
//   }

//   return (
//     <div className="Home">
//       {currentItems?.map((game, index) => {
//         return (
//           <div key={index} className="card">
//             <i className="fa-sharp fa-solid fa-cart-shopping" onClick={() => addBasket(game)}></i>

//             <Link to={"/prod/" + game.id} className="item">
//               <img className="gameImg" src={game.image} alt={game.productName} />
//             </Link>
//             <button className="btn-bay" onClick={() => downloadGame(game)}>{game.price}</button>
//           </div>
//         );
//       })}
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             className={pageNumber === currentPage ? "active" : ""}
//             onClick={() => handlePageChange(pageNumber)}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

