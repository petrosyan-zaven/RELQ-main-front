import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
            <h3>Contact Us</h3>
            <div className="contact-box">
                <NavLink to={'/'}><i className="fa-regular fa-envelope"></i></NavLink>
                <NavLink to={'/'}><i className="fa-regular fa-paper-plane"></i></NavLink>
                <NavLink to={'/'}><i className="fa-solid fa-phone-flip"></i></NavLink>
                <NavLink to={"https://www.youtube.com/"} target={"_blank"}><i className="fa-brands fa-youtube"></i></NavLink>
                <NavLink to={"https://www.facebook.com"} target={"_blank"}><i className="fa-brands fa-facebook-f"></i></NavLink>
                <NavLink to={'/'}><i className="fa-brands fa-instagram"></i></NavLink>
                <NavLink to={'/'}><i className="fa-brands fa-whatsapp"></i></NavLink>
                <NavLink to={'/'}><i className="fa-brands fa-viber"></i></NavLink>
                <NavLink to={'/'}><i className="fa-brands fa-linkedin-in"></i></NavLink>
            </div>
    </div>
  )
}

export default Footer