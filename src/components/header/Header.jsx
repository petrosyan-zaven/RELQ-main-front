import { useState, useEffect } from 'react'
import Search from '../search'
import NavBar from '../navBar/NavBar'
import { useNavigate, Link } from 'react-router-dom'


function Header({active, setActive}) {

  const navigate = useNavigate()
  const [isSearchVisible, setSearchVisible] = useState(false);
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
        <h1 className='logo'>Logo </h1>
        <NavBar active={active} setActive = {setActive}/>
      </div>
      <div className='box2'>
        <Search isSearchVisible = {isSearchVisible} setSearchVisible = {setSearchVisible} />
        <span className={active ?  "show": "hide"}><i className="fa-solid fa-user" ></i></span>
        <button className='btn' onClick={() => login === 'Log in'  ? navigate('/login') : handleLogout()}>{login}</button>      
        <Link to={'/basket'}><i className="fa-solid fa-cart-shopping"></i></Link>
      </div>
    </div>
  )
}

export default Header