// import React from 'react'
// import './Search.scss'
// import SearchItem from './SearchItem/SearchItem'

// function Search() {

//     function showSearch () {
//         <SearchItem />
//     }

//   return ( 
//       <div className="search" onClick={() => showSearch()}>
//           <label for="search" >
//               <input type="search" id="search"/>
//           </label>
          
//       </div>


//   )
// }

// export default Search




// import React, { useState } from 'react';
import './Search.scss';
import SearchItem from './SearchItem/SearchItem';

function Search({isSearchVisible, setSearchVisible}) {
  

  function showSearch() {
    setSearchVisible(true);
  }
  console.log(isSearchVisible);

  return (
    <div className="search" onClick={showSearch}>
      <i className="fa-solid fa-magnifying-glass"></i>
      {isSearchVisible && <SearchItem isSearchVisible = {isSearchVisible} setSearchVisible = {setSearchVisible}/>}
    </div>
  );
}

export default Search;

