import axios from 'axios'
import { GET_ALL_USERS_ERROR, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_SINGLE_USER_DATA_ERROR, GET_SINGLE_USER_DATA_REQUEST, GET_SINGLE_USER_DATA_SUCCESS } from './User.ActionTypes'

export const getAllUsers = () => dispatch => {
 dispatch({type:GET_ALL_USERS_REQUEST});
 return axios.get("http://localhost:8080/search")
 .then(res => dispatch({type:GET_ALL_USERS_SUCCESS,payload:res.data}))
 .catch(err => dispatch({type:GET_ALL_USERS_ERROR}))
}

export const getSingleUserDetails = (id) => dispatch => {
    dispatch({type:GET_SINGLE_USER_DATA_REQUEST});
    return axios.get(`http://localhost:8080/single/${id}`)
    .then(res => dispatch({type:GET_SINGLE_USER_DATA_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_SINGLE_USER_DATA_ERROR}))
}