import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

function Header() {

  const navigate = useNavigate();
  const { current_user, logOutUser } = useContext(AuthContext);
  
  const logOutButtonClick = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-base-200">

        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-semibold text-xl text-black">
              <li><NavLink to={"/"} >Home</NavLink></li>
              <li><NavLink to={"/allproducts"} >All Products</NavLink></li>

            </ul>
          </div>
          <NavLink to={'/'}> <img
            src="/images/logo-ecommerce.png" className="w-16 h-16 rounded-xl" /></NavLink>
          <a className="font-bold text-green-600 text-xl from-neutral-content space-x-1 px-1">eBusiness Shop</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-sm text-black">
            <li><NavLink to={"/"} >Home</NavLink></li>
            <li><NavLink to={"/allproducts"} >All Products</NavLink></li>

          </ul>
        </div>


        <div className="navbar-end">
          {
            current_user ? (
              <>
                <div className="flex items-center gap-2">
                  <img src={current_user?.photoURL || "/images/user.png"} className="w-7 rounded-full" />
                  <span>{current_user?.displayName || "No Name"}</span>
                  <button onClick={logOutButtonClick} className="btn btn-outline btn-success">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <ul className="menu menu-horizontal px-1">
                <li><NavLink to={"/login"} >Login</NavLink></li>
              </ul>
            )
          }
        </div>

      </div>
      {/* <Link to={"/login"} >Login</Link>
     <Link to={"/dashboard"} >Dashboard</Link> */}
    </>
  )
}

export default Header;