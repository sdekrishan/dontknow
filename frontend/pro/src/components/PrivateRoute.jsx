import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {isAuth} = useSelector(store=> store.auth);

    if(isAuth){
        return children
    }else{
        return <Navigate to='/login'/>
    }
  
}

export default PrivateRoute