import React from 'react'
import {Routes, Route} from 'react-router-dom'
import About from './About'
import Home from './Home'
import Login from './Login'
import PrivateRoute from '../components/PrivateRoute'
import SearchBar from '../components/SearchBar'
import More from '../components/More'
import Profile from '../components/Profile'
import Friends from '../components/Friends'
import CheckingRoute from '../components/CheckingRoute'
const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<CheckingRoute/>}>GEtting Routes</Route> */}
    <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}>Home</Route>
    <Route path="/search" element={<SearchBar/>}>Search</Route>
    <Route path="/friends" element={<Friends/>}>Search</Route>
    <Route path="/profile" element={<Profile/>}>Search</Route>
    <Route path="/more" element={<More/>}>Search</Route>
    <Route path="/about" element={<About/>}>About</Route>
    <Route path="/login" element={<Login/>}>Login</Route>
</Routes>
  )
}

export default AllRoutes