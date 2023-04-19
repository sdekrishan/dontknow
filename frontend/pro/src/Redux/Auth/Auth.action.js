import { SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./Auth.ActioTypes"
import axios from 'axios';
export const signUpUser= (form)=> dispatch => {
    dispatch({type:SIGNUP_REQUEST});
    return axios.post(`http://localhost:8080/register`,form)
    .then(res=>dispatch({type:SIGNUP_SUCCESS}))
    .catch(err=>dispatch({type:SIGNUP_ERROR}))
}

export const signInUser = (form)=>dispatch => {
    dispatch({type:SIGNIN_REQUEST});
    return axios.post(`http://localhost:8080/login`,form)
    .then(res=>{
        sessionStorage.setItem("email",JSON.stringify(res.data.details.email))
        sessionStorage.setItem("id",JSON.stringify(res.data.details.id))
       return dispatch({type:SIGNIN_SUCCESS,payload:res.data.token})
    })
    .catch(err => dispatch({type:SIGNIN_ERROR}))
}

