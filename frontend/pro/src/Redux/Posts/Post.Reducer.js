import { BiStreetView } from "react-icons/bi"
import { ADD_COMMENT_ERROR, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, CREATE_POST_ERROR, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_SINGLE_USER_POSTS_ERROR, GET_SINGLE_USER_POSTS_REQUEST, GET_SINGLE_USER_POSTS_SUCCESS, GET_SINGLE_USER_PROFILE_POSTS_ERROR, GET_SINGLE_USER_PROFILE_POSTS_REQUEST, GET_SINGLE_USER_PROFILE_POSTS_SUCCESS, LIKE_ERROR, LIKE_REQUEST, LIKE_SUCCESS } from "./Post.ActionTypes"

const initialState = {
    posts:[],
    isLoading:false,
    isError:false,
    profilePosts:[],
    userDetails:[]
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
            return{
                ...state,
                posts:payload.posts,
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
            // console.log(payload);
            return {
                ...state,
                isLoading:false,
                // posts:payload
            }
        }
        case(ADD_COMMENT_ERROR):{
            return{
                ...state,
                isError:true
            }
        }
        default:return state
    }
}

export default PostReducer