import React from 'react'
import {Routes, Route} from 'react-router-dom'
import About from './About'
import Home from './Home'
import Login from './Login'
const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Home/>}>Home</Route>
    <Route path="/about" element={<About/>}>About</Route>
    <Route path="/login" element={<Login/>}>Login</Route>
</Routes>
  )
}

export default AllRoutes