import React, { useState } from "react";
import { images } from "../Container/index";
import "./Styles/Login.css";
import {
  BsFillEnvelopeFill,
  BsFillShieldLockFill,
  BsGenderAmbiguous,
} from "react-icons/bs";
import {useToast} from '@chakra-ui/react'
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signUpUser } from "../Redux/Auth/Auth.action";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [toggleSignOut, setToggleSignOut] = useState(false);
  const { loading } = useSelector((store) => store.auth);
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
  const dispatch = useDispatch();
  const toast = useToast()
  const navigate = useNavigate()
  const handleSignIn = () => {
    setToggleSignOut(false);
  };

  const handleSignOut = () => {
    setToggleSignOut(true);
  };
  
  console.log(loading);
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignOutChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSignInButton = (e) => {
    e.preventDefault();
    dispatch(signInUser(loginForm))
    .then(res=>{
      if(res.type === 'SIGNIN_SUCCESS'){
        toast({
          title: 'Login Successful.',
          description: "You've logged in successfully.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:'top'
        })
        navigate("/home")
      }
      else{
        toast({
          title: 'Login Error.',
          description:`An Error Occured.` ,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:'top'
        })
      }
    })
  };

  const handleSignOutButton = (e) => {
    e.preventDefault();
    dispatch(signUpUser(signupForm))
    .then(res=>{
      if(res.type === 'SIGNUP_SUCCESS'){
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:'top'
        })
        setToggleSignOut(false)
      }
      else{
        toast({
          title: 'Error Occured.',
          description: "Something went Wrong.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:'top'
        })
      }
    })

  }

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
                  required
                />
              </div>
              <div className="input-field">
                <BsFillShieldLockFill />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSignInChange}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              {/* <p className="social-text">Or Sign in with social platforms</p> */}
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
                  required
                />
              </div>
              <div className="input-field">
                <BsFillEnvelopeFill />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleSignOutChange}
                  required
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
                <select name="gender" id="" onChange={handleSignOutChange} required>
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <input type="submit" className="btn" value={"Sign Up"}  />
              <p className="social-text">Or Sign up with social platforms</p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Let's Start with creating a Account first😎
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
              <h3>Already a member ?</h3>
              <p>
                Let's Start the chat again.
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
