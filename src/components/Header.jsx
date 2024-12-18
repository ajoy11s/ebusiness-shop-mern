import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const { current_user, logOutUser } = useContext(AuthContext);
  const [current_user_mongo, setCurrentUserMongo] = useState([]);

  const [theme, setTheme] = useState('light'); // Default theme

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Call useEffect unconditionally
  useEffect(() => {
    if (current_user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_GET_SINGLE_LOGIN_USER}${current_user.email}`);
          const data = await response.json();
          setCurrentUserMongo(data);
        } catch (error) {
          console.error("Error:", error.message);
        } finally {
          //console.log("finally");
        }
      };

      fetchUserData();
    }
  }, [current_user]); // Dependency array includes current_user


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
              <li><NavLink to={"/allcategory"} >All Category</NavLink></li>
              {
                current_user && current_user_mongo.email ? (
                  <li><NavLink to={"/dashboard"} >Dashboard</NavLink></li>
                ) : (
                  <></>
                )
              }
              <li> <input type="checkbox" className="toggle" defaultChecked={theme === 'dark'} onChange={handleThemeChange}/>
                <span className="ml-2">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span></li>
            </ul>
          </div>
          <NavLink to={'/'}> <img
            src="/images/logo-ecommerce.png" className="w-16 h-16 rounded-xl" /></NavLink>
          <a className="font-bold font-petit text-green-600 text-3xl from-neutral-content space-x-1 px-1">eBusiness Shop</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-sm text-black">
            <li><NavLink to={"/"} >Home</NavLink></li>
            <li><NavLink to={"/allcategory"} >All Category</NavLink></li>
            {
              current_user && current_user_mongo.email ? (
                <li><NavLink to={"/dashboard"} >Dashboard</NavLink></li>
              ) : (
                <></>
              )
            }

          </ul>
          <input
            type="checkbox"
            className="toggle"
            defaultChecked={theme === 'dark'}
            onChange={handleThemeChange}
          />
          <span className="ml-2">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </div>


        <div className="navbar-end">
          {
            current_user && current_user_mongo.email ? (
              <>
                <div className="flex items-center gap-2">
                  <img src={current_user_mongo?.image_url || "/images/user.png"} className="w-7 rounded-full" />
                  <span>{current_user_mongo?.name || "No Name"}</span>
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