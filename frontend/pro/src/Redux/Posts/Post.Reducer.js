import { GET_SINGLE_USER_POSTS_ERROR, GET_SINGLE_USER_POSTS_REQUEST, GET_SINGLE_USER_POSTS_SUCCESS } from "./Post.ActionTypes"

const initialState = {
    posts:[],
    isLoading:false,
    isError:false
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
                posts:payload,
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
        default:return state
    }
}

export default PostReducer