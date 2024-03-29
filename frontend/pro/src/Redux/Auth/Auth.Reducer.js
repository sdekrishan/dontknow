import { LOGOUT, SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./Auth.ActioTypes"
const initialState= {
    token:sessionStorage.getItem("token") || null,
    isAuth:sessionStorage.getItem("token") ? true : false,
    loading:false,
    error:false,
    email: sessionStorage.getItem("email") || null,
    id: sessionStorage.getItem("id") || null, 
}

const AuthReducer = (state= initialState,{type,payload})=>{
    switch(type){
        case(SIGNUP_REQUEST):{
            return {
                ...state,
              loading:true  
            }
        }
        case(SIGNUP_SUCCESS):{
            return {
                ...state,
                loading:false,
            }
        }
        case(SIGNUP_ERROR):{
            return {
                ...state,
                error:true
            }
        }
        case(SIGNIN_REQUEST):{
            return {
                ...state,
                loading:true,
            }
        }
        case(SIGNIN_SUCCESS):{
            sessionStorage.setItem("token",payload.token)
            sessionStorage.setItem("email",payload.details.email)
            sessionStorage.setItem("id",payload.details.id)
            return {
                ...state,
                loading:false,
                isAuth:true,
                email:payload.details.email,
                id:payload.details.id,
                token:payload.token,
            }
        }
        case(SIGNIN_ERROR):{
            return {
                ...state,
                loading:false,
                error:true,
            }
        }
        case(LOGOUT):{
            return{
                ...state,
                isAuth:false,
                token:""
            }
        }
        default:return state
    }
}

export default AuthReducer