import { BiStreetView } from "react-icons/bi"
import { ADD_COMMENT_ERROR, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, CREATE_POST_ERROR, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_ERROR, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_FRIEND_POSTS_ERROR, GET_FRIEND_POSTS_REQUEST, GET_FRIEND_POSTS_SUCCESS, GET_SINGLE_USER_POSTS_ERROR, GET_SINGLE_USER_POSTS_REQUEST, GET_SINGLE_USER_POSTS_SUCCESS, GET_SINGLE_USER_PROFILE_POSTS_ERROR, GET_SINGLE_USER_PROFILE_POSTS_REQUEST, GET_SINGLE_USER_PROFILE_POSTS_SUCCESS, LIKE_ERROR, LIKE_REQUEST, LIKE_SUCCESS } from "./Post.ActionTypes"

const initialState = {
    posts:[],
    isLoading:false,
    isError:false,
    profilePosts:[],
    userDetails:[],
    friendPosts:[]
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

const PostReducer = (state = initialState, {type,payload})=>{
    switch(type){
        case(GET_SINGLE_USER_POSTS_REQUEST):{
            return {
                ...state,
                isLoading:true,
                isError:true
            }
        }
        case(GET_SINGLE_USER_POSTS_SUCCESS):{
            // const shuffledArray = shuffleArray(payload.posts)
            return{
                ...state,
                posts:[...state.posts,...payload.posts],
                userDetails:payload.user,
                isLoading:false,
                isError:false
            }
        }
        case(GET_SINGLE_USER_POSTS_ERROR):{
            return {
                ...state,
                isError:true,
                isLoading:false
            }
        }
        case(GET_SINGLE_USER_PROFILE_POSTS_REQUEST):{
            return {
                ...state,
                isLoading:true,
                isError:true
            }
        }
        case(GET_SINGLE_USER_PROFILE_POSTS_SUCCESS):{
            return{
                ...state,
                profilePosts:payload,
                isLoading:false,
                isError:false
            }
        }
        case(GET_SINGLE_USER_PROFILE_POSTS_ERROR):{
            return {
                ...state,
                isError:true,
                isLoading:false
            }
        }
        case(CREATE_POST_REQUEST):{
            return{
                ...state,
                isLoading:true,
            }
        }
        case(CREATE_POST_SUCCESS):{
            return {
                ...state,
                isLoading:false,
                posts:[...state.posts,payload]
            }
        }
        case(CREATE_POST_ERROR):{
            return{
                ...state,
                isError:true
            }
        }
        case(LIKE_REQUEST):{
            return {
                ...state,
                isLoading:true
            }
        }
        case(LIKE_SUCCESS):{
            return {
                ...state,
                posts:payload,
                isLoading:false
            }
        }
        case(LIKE_ERROR):{
            return {
                ...state,
                isError:true
            }
        }
        case(ADD_COMMENT_REQUEST):{
            return{
                ...state,
                isLoading:true
            }
        }
        case(ADD_COMMENT_SUCCESS):{
            return {
                ...state,
                isLoading:false,
            }
        }
        case(ADD_COMMENT_ERROR):{
            return{
                ...state,
                isError:true
            }
        }
        case(GET_FRIEND_POSTS_REQUEST):{
            return {
                ...state,
                isLoading:true
            }
        }
        case(GET_FRIEND_POSTS_SUCCESS):{
            return {
                ...state,
                isLoading:false,
                friendPosts:payload
            }
        }
        case(GET_FRIEND_POSTS_ERROR):{
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        }
        case(DELETE_POST_REQUEST):{
            return{
                ...state,
                isLoading:true
            }
        }
        case(DELETE_POST_SUCCESS):{
            return {
                ...state,
                isLoading:false
            }
        }
        case(DELETE_POST_ERROR):{
            return{
                ...state,
                isError:true
            }
        }
        default:return state
    }
}

export default PostReducer