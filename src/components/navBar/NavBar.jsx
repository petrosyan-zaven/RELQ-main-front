import React, { useEffect, useState } from 'react'
import { NavLink as Link } from "react-router-dom";

function NavBar({active}) {

  console.log(active);
  const [ admin, setAdmin ] = useState(false);
  const role = localStorage.getItem('role') || sessionStorage.getItem('role')
 
useEffect (()=> {
  if(role === '1') {
    setAdmin(!admin);
  } else setAdmin(admin); 
}, [role,active])


  return (
    <div className='NavBar'>
        <Link to={'/'}>Home</Link>
        <Link to = {'/about'}>About</Link>
        <Link className={active ? "" : "hide"} to = {'/edit'}>Edit</Link>
        <Link className={active ? "" : "hide"} to = {'/add-prod'}>Add Product</Link>
    </div>
  )
}

export default NavBar