import { CREATE_POST_ERROR, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_SINGLE_USER_POSTS_ERROR, GET_SINGLE_USER_POSTS_REQUEST, GET_SINGLE_USER_POSTS_SUCCESS, GET_SINGLE_USER_PROFILE_POSTS_ERROR, GET_SINGLE_USER_PROFILE_POSTS_REQUEST, GET_SINGLE_USER_PROFILE_POSTS_SUCCESS } from "./Post.ActionTypes"
import axios from 'axios';
//for getting single user posts user+friends post
export const getSingleUserPosts = (id,token) => dispatch =>{
    dispatch({type:GET_SINGLE_USER_POSTS_REQUEST});
    return axios.get(`http://localhost:8080/posts/all/${id}`,{
        headers:{
            "Content-type":"aplication/json",
            "authorization":token
        }
    })    
    .then(res => dispatch({type:GET_SINGLE_USER_POSTS_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_SINGLE_USER_POSTS_ERROR}))
}

export const getSingleUserProfilePosts = (id,token) => dispatch =>{
    dispatch({type:GET_SINGLE_USER_PROFILE_POSTS_REQUEST});
    return axios.get(`http://localhost:8080/posts/${id}`,{
        headers:{
            "Content-type":"aplication/json",
            "authorization":token
        }
    })    
    .then(res => dispatch({type:GET_SINGLE_USER_PROFILE_POSTS_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_SINGLE_USER_PROFILE_POSTS_ERROR}))
}


export const createNewPost = (id,details) => dispatch => {
    dispatch({type:CREATE_POST_REQUEST});
    return axios.post(`http://localhost:8080/posts/create/${id}`,details)
    .then(res => dispatch({type:CREATE_POST_SUCCESS,payload:res.data.post}))
    .catch(err => dispatch({type:CREATE_POST_ERROR}))
}