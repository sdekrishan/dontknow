const { GET_MESSAGES_REQUEST, GET_MESSAGES_ERROR, GET_MESSAGES_SUCCESS, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR } = require("./Chat.ActionTypes")

const initialState ={
    messages:[],
    mLoading:false,
    mError:false
}

const ChatReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case(GET_MESSAGES_REQUEST):{
            return{
                ...state,
                mLoading:true
            }
        }
        case(GET_MESSAGES_SUCCESS):{
            return{
                ...state,
                mLoading:false,
                messages:payload
            }
        }
        case(GET_MESSAGES_ERROR):{
            return{
                ...state,
                mLoading:false,
                mError:true
            }
        }
        case(SEND_MESSAGE_REQUEST):{
            return {
                ...state,
                mLoading:true
            }
        }
        case(SEND_MESSAGE_SUCCESS):{
            return {
                ...state,
                mLoading:false,
                messages:[...state.messages,payload]
            }
        }
        case(SEND_MESSAGE_ERROR):{
            return {
                ...state,
                mError:true
            }
        }
        default: return state
    }
}

export default ChatReducer