import { useState, useEffect } from 'react'
import Search from '../search'
import NavBar from '../navBar/NavBar'
import { useNavigate } from 'react-router-dom'


function Header({active, setActive}) {

  const navigate = useNavigate()

  // const [ active, setActive ] = useState(false)
  const [ login, setLogin ] = useState('Log in');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

useEffect (()=> {
  if(token) {
    setLogin("Log out")
    setActive(!active);
  } 
}, [token])

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate('/');
  setLogin("Log in")
  if( active) {
      setActive(!active);
  } 
};
console.log(login, "log");

  return (
    <div className='Header'>
    <div className='box'>
      <h1>Logo </h1>
      <NavBar active={active} setActive = {setActive}/>
    </div>
    <div className='box'>
      <Search />
      <button className='btn' onClick={() => login === 'Log in'  ? navigate('/login') : handleLogout()}>{login}</button>      
    </div>
    </div>
  )
}

export default Header