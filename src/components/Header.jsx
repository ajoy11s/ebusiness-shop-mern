import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
        <NavLink to={'/'}> <img
            src="/images/logo-ecommerce.png" className="w-16 h-16 rounded-xl" /></NavLink>
          <a className="btn btn-ghost text-xl">eBusiness Shop</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to={"/"} >Home</NavLink></li>
            <li><NavLink to={"/allproducts"} >All Products</NavLink></li>
            <li><NavLink to={"/login"} >Login</NavLink></li>
          </ul>
        </div>
      </div>
      {/* <Link to={"/login"} >Login</Link>
     <Link to={"/dashboard"} >Dashboard</Link> */}
    </>
  )
}

export default Header;