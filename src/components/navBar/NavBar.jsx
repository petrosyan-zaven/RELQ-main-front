import React, { useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";

function NavBar({ active, setActive }) {
  console.log(active);
  const [admin, setAdmin] = useState(false);
  const [ open, setOpen ] = useState(false);
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  console.log(admin);

  useEffect(() => {
    if (role === "1") {
      setAdmin(!admin);
    } else {
      setAdmin(false);
    }
  }, [role]);

function openMenu() {
  if( !open ) {
    setOpen(true);
  } else {
    setOpen(false);
  }
}

  console.log(open);
  return (
    <div className="NavBar">
      <div className={open ? "open burger"  : "burger"} >
        <i className={open ?  "fa-solid fa-x" : "fa-solid fa-bars"} onClick={openMenu}></i>
        <nav className="burger-nav">
          <Link to={"/"}>Home</Link>
          <Link className={admin ? "" : "hide"} to={"/product-controll"}>
            Product option
          </Link>
          <Link className={admin ? "" : "hide"} to={"/add-prod"}>
            Add Product
          </Link>
          <Link to={"/about"}>About</Link>
        </nav>
      </div>

      {/* <Link to={"/"}>Home</Link>
      <Link className={admin ? "" : "hide"} to={"/product-controll"}>
        Product option
      </Link>
      <Link className={admin ? "" : "hide"} to={"/add-prod"}>
        Add Product
      </Link>
      <Link to={"/about"}>About</Link> */}
    </div>
  );
}

export default NavBar;

