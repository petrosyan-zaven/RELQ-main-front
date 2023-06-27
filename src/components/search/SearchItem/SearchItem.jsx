import React from 'react'


function SearchItem({isSearchVisible, setSearchVisible}) {


  function hideSearch() {
    setSearchVisible(!isSearchVisible);
    console.log(!isSearchVisible);
  }
  
  return (
    <div className='SearchItem'>
    <h1 className='hhh'>Search</h1>
    <i className="fa-solid fa-x" onClick={hideSearch}></i>
      <label htmlFor="search">
        <input type="search" id="search" />
      </label>
    </div>
  )
}

export default SearchItem