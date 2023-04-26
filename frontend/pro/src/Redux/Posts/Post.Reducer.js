import { GET_SINGLE_USER_POSTS_ERROR, GET_SINGLE_USER_POSTS_REQUEST, GET_SINGLE_USER_POSTS_SUCCESS, GET_SINGLE_USER_PROFILE_POSTS_ERROR, GET_SINGLE_USER_PROFILE_POSTS_REQUEST, GET_SINGLE_USER_PROFILE_POSTS_SUCCESS } from "./Post.ActionTypes"

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
        default:return state
    }
}

export default PostReducer