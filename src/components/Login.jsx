import React, { createContext, useRef } from 'react';
import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";


const Login = () => {
  const navigate = useNavigate();

  const { registerEmailPassword, updateUserProfile, signInEmailPassword } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenReg, setIsOpenReg] = useState(false);

  const [nameReg, setNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [mobileNoReg, setMobileNoReg] = useState('');
  const [addressReg, setAddressReg] = useState('');

  const formRef = useRef();
  const handleLoginBtnClick = (evt) => {
    evt.preventDefault();
    const formlog = new FormData(formRef.current);
    const emaillogin = formlog.get("emaillogin"); //send to firebase for login
    const passwordlogin = formlog.get("passwordlogin"); //send to firebase for login

    signInEmailPassword(emaillogin, passwordlogin)
      .then((result) => {
        console.log("Data User:" + result.user);
        toast.success("Login Successful", {
          position: "top-right",
        });
        navigate("/dashboard");
      })
  }

  const handleRegisterBtnClick = () => {
    setIsOpen(!isOpen);
    setIsOpenReg(!isOpenReg);
  }

  const handleAlreadyanAccLoginBtnClick = () => {
    setIsOpen(!isOpen);
    setIsOpenReg(!isOpenReg);
  }

  const handleRegisterAndDataSave = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email"); //send to firebase for registration
    const password = form.get("password"); //send to firebase for registration
    const tel = form.get("tel");
    const address = form.get("address");

    const photoUrl = "/images/user.png";
    registerEmailPassword(email, password)
      .then((result) => {
        console.log(result.user);
        handleUserProfile(name, photoUrl);
        toast.success("User Registration Successful", {
          position: "top-right",
        });
        setIsOpen(!isOpen);
        setIsOpenReg(!isOpenReg);
      })
  }

  const handleUserProfile = (name, photo) => {
    const profile = { displayName: name, photoURL: photo };

    updateUserProfile(profile)
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* Login modal start */}
      {isOpen && (
        <div className="hero bg-base-200 min-h-80vh">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" ref={formRef} onSubmit={handleLoginBtnClick}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name="emaillogin" id="emaillogin" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" name="passwordlogin" id="passwordlogin" placeholder="password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-2">
                  <button className="btn btn-primary" onClick={handleLoginBtnClick}>Login</button>
                </div>
                <div>
                  <span>Don't have an account?<NavLink className="text size-3 font-bold" onClick={handleRegisterBtnClick}>Register</NavLink></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Login modal end */}


      {/* Register modal start */}
      {isOpenReg && (
        <div className="hero bg-base-200 min-h-80vh">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleRegisterAndDataSave}>
                <div className="form-control">
                  <input type="text" name="name" id="name" placeholder="Please enter your name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="email" name="email" id="email" placeholder="Please enter your email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="password" name="password" id="password" placeholder="Please enter your password" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="tel" name="tel" id="tel" placeholder="Please enter your mobile no" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="text" name="address" id="address" placeholder="Please enter your address" className="input input-bordered" required />
                </div>
                <div className="form-control mt-2">
                  <button className="btn btn-primary">Register</button>
                </div>
                <div>
                  <span>Already have an account?<NavLink className="text size-3 font-bold" onClick={handleAlreadyanAccLoginBtnClick}>Login</NavLink></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Register modal end */}


    </div>
  );
};

export default Login;