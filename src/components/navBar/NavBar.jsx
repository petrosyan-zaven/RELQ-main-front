import React, { useEffect, useState } from 'react'
import { NavLink as Link } from "react-router-dom";

function NavBar({active, setActive}) {

  console.log(active);
  const [ admin, setAdmin ] = useState(false);
  const role = localStorage.getItem('role') || sessionStorage.getItem('role')
  console.log(admin);
 
useEffect (()=> {
  if(role === '1') {
    setAdmin(!admin);
  } else {
    setAdmin(false);
  } 
}, [role])

  console.log(admin);
  return (
    <div className='NavBar'>
        <Link to={'/'}>Home</Link>
        <Link className={admin ? "" : "hide"} to = {'/product-controll'}>Product option</Link>
        <Link className={admin ? "" : "hide"} to = {'/add-prod'}>Add Product</Link>
        <Link to = {'/about'}>About</Link>

    </div>
  )
}

export default NavBar