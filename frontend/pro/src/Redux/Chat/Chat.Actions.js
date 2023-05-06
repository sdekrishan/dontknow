import axios from 'axios';
const { GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR } = require("./Chat.ActionTypes")

export const getMessagesOfChat = (conversationId) => dispatch => {
    dispatch({type:GET_MESSAGES_REQUEST});
    return axios.get(`http://localhost:8080/message/${conversationId}`)
    .then(res => dispatch({type:GET_MESSAGES_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:GET_MESSAGES_ERROR}))
}

export const sendMessageToFriend = (conversationId,senderId,text) => dispatch => {
    dispatch({type:SEND_MESSAGE_REQUEST});
    return axios.post(`http://localhost:8080/message/${conversationId}`,{senderId,text})
    .then(res => dispatch({type:SEND_MESSAGE_SUCCESS,payload:res.data}))
    .catch(err => dispatch({type:SEND_MESSAGE_ERROR}))
}