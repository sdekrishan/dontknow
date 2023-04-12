import { GET_SINGLE_USER_POSTS_ERROR, GET_SINGLE_USER_POSTS_REQUEST, GET_SINGLE_USER_POSTS_SUCCESS } from "./Post.ActionTypes"
import axios from 'axios';
export const getSingleUserPosts = (token) => dispatch =>{
    dispatch({type:GET_SINGLE_USER_POSTS_REQUEST});
    return axios.get(`http://localhost:8080/posts/all`,{
        headers:{
            "Content-type":"aplication/json",
            "authorization":token
        }
    })    
    .then(res => dispatch({type:GET_SINGLE_USER_POSTS_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_SINGLE_USER_POSTS_ERROR}))
}