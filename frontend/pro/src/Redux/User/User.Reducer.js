import { GET_ALL_USERS_ERROR, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS } from "./User.ActionTypes"

const initialState = {
    searchData : [],
    isLoading:false,
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
        default : return state
    }
}

export default UserReducer