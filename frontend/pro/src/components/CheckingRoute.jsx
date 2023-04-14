import React from 'react'
import { useLocation } from 'react-router-dom'
import Home from '../Routes/Home';
import SearchBar from './SearchBar';
import More from './More';
import "./Styles/CheckingRoute.css"
import Friends from './Friends';
import Profile from './Profile';
import Login from '../Routes/Login';
const CheckingRoute = () => {
    const location = useLocation()
    console.log(location);
  return (
    <div className='main_container'>
    {
        location.pathname === "/home" ? <Home/> 
        : location.pathname === '/search' ? <SearchBar/>
        : location.pathname === '/friends' ? <Friends/>
        : location.pathname === '/profile' ? <Profile/>
        : location.pathname === "/" ? <Login/>
        : <More/>
    }
    </div>
  )
}

export default CheckingRoute