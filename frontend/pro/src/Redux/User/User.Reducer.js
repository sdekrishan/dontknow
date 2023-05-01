import Friends from "../../components/Friends"
import { CHANGE_DP_ERROR, CHANGE_DP_REQUEST, CHANGE_DP_SUCCESS, FRIEND_REQUEST_ERROR, FRIEND_REQUEST_REQUEST, FRIEND_REQUEST_SUCCESS, GET_ALL_FRIENDS_ERROR, GET_ALL_FRIENDS_REQUEST, GET_ALL_FRIENDS_SUCCESS, GET_ALL_USERS_ERROR, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_SINGLE_USER_DATA_ERROR, GET_SINGLE_USER_DATA_REQUEST, GET_SINGLE_USER_DATA_SUCCESS } from "./User.ActionTypes"

const initialState = {
    searchData : [],
    userData : {},
    unfollowedPeople:[],
    isLoading:false,
    pictureLoading:false,
    isError:false
}

const UserReducer = (state = initialState, {type,payload})=>{
    switch(type){
        case(GET_ALL_USERS_REQUEST):{
            return {
                ...state,
                isLoading:true
            }
        }
        case(GET_ALL_USERS_SUCCESS):{
            return {
                ...state,
                searchData:payload,
                isLoading:false
            }
        }
        case(GET_ALL_USERS_ERROR):{
            return {
                ...state,
                isError:true
            }
        }
        case(GET_SINGLE_USER_DATA_REQUEST):{
            return {
                ...state,
                isLoading:true
            }
        }
        case(GET_SINGLE_USER_DATA_SUCCESS):{
            return {
                ...state,
                userData:payload,
                isLoading:false,
            }
        }
        case(GET_SINGLE_USER_DATA_ERROR):{
            return {
                ...state,
                isError:true
            }
        }
        case(CHANGE_DP_REQUEST):{
            return{
                ...state,
                pictureLoading:true
            }
        }
        case(CHANGE_DP_SUCCESS):{
            return {
                ...state,
                pictureLoading:false,
                userData:payload
            }
        }
        case(CHANGE_DP_ERROR):{
            return{
                ...state,
                isError:true
            }
        }
        case(GET_ALL_FRIENDS_REQUEST):{
            return {
                ...state,
                isLoading:true
            }
        }
        case(GET_ALL_FRIENDS_SUCCESS):{
            return {
                ...state,
                unfollowedPeople:payload,
                isLoading:false
            }
        }
        case(GET_ALL_FRIENDS_ERROR):{
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        }
        case(FRIEND_REQUEST_REQUEST):{
            return {
                ...state,
                isLoading:true
            }
        }
        case(FRIEND_REQUEST_SUCCESS):{
            return {
                ...state,
                isLoading:false
            }
        }
        case(FRIEND_REQUEST_ERROR):{
            return {
                ...state,
                isError:true
            }
        }
        default : return state
    }
}

export default UserReducer