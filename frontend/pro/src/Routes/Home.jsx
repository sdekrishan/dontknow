import { useState } from "react";
import {Routes,Route, Link} from 'react-router-dom';
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
const Home = () => {
  return (
    <nav style={{display:"flex",justifyContent:"space-evenly ",backgroundColor:'lightblue',padding:"1rem"}}>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/login'}>Login </Link>
        <Link to={'/signup'}>SignUp</Link>
    </nav>
  )
}

export default Home