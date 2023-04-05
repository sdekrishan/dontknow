import React, { useState } from "react";
import { images } from "../Container/index";
import "./Styles/Login.css";
import {
  BsFillEnvelopeFill,
  BsFillShieldLockFill,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Spinner, useDisclosure} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signUpUser } from "../Redux/Auth/Auth.action";
const Login = () => {
  const [toggleSignOut, setToggleSignOut] = useState(false);
  const {loading,error} = useSelector(store=> store.auth);
  const dispatch = useDispatch()
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleSignIn = () => {
    setToggleSignOut(false);
  };

  const handleSignOut = () => {
    setToggleSignOut(true);
    // dispatch(signUpUser(signupForm))
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setLoginForm({ ...loginForm, [name]: value });
  };
  const handleSignOutChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };
  const handleSignInButton = (e) => {
    e.preventDefault();
    console.log(loginForm);
    dispatch(signInUser(loginForm))
  };
  const handleSignOutButton = (e) => {
    e.preventDefault();
    console.log(signupForm);  
    dispatch(signUpUser(signupForm))
    // axios.post(`http://localhost:8080/register`,signupForm);
  };
  return (
    <>
      <div className={`container ${toggleSignOut ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignInButton}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <FiUser />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleSignInChange}
                />
              </div>
              <div className="input-field">
                <BsFillShieldLockFill />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignInChange}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
            </form>
            <form className="sign-up-form" onSubmit={handleSignOutButton}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <FiUser />
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  onChange={handleSignOutChange}
                />
              </div>
              <div className="input-field">
                <BsFillEnvelopeFill />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleSignOutChange}
                />
              </div>
              <div className="input-field">
                <BsFillShieldLockFill />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignOutChange}
                />
              </div>

              <div className="input-field">
                <BsGenderAmbiguous />
                <select name="gender" id="" onChange={handleSignOutChange}>
                  <option value=''>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <input type="submit" className="btn" value={'Sign Up'} disabled={loading}/>
              <p className="social-text">Or Sign up with social platforms</p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignOut}
              >
                Sign up
              </button>
            </div>
            <img src={images.log} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
            <img src={images.register} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
