import axios from "axios";
import {
  ADD_FRIEND_ERROR,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  CANCEL_SEND_FRIEND_REQUEST_REQUEST,
  CANCEL_SEND_FRIEND_REQUEST_SUCCESS,
  CHANGE_DP_ERROR,
  CHANGE_DP_REQUEST,
  CHANGE_DP_SUCCESS,
  FRIEND_REQUEST_ERROR,
  FRIEND_REQUEST_REQUEST,
  FRIEND_REQUEST_SUCCESS,
  GET_ALL_FRIENDS_ERROR,
  GET_ALL_FRIENDS_REQUEST,
  GET_ALL_FRIENDS_SUCCESS,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_FRIENDS_PROFILE_ERROR,
  GET_FRIENDS_PROFILE_REQUEST,
  GET_FRIENDS_PROFILE_SUCCESS,
  GET_SINGLE_USER_DATA_ERROR,
  GET_SINGLE_USER_DATA_REQUEST,
  GET_SINGLE_USER_DATA_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./User.ActionTypes";

export const getAllUsers = (id) => (dispatch) => {
  dispatch({ type: GET_ALL_USERS_REQUEST });
  return axios
    .get(`https://lestalk.onrender.com/search/${id}`)
    .then((res) => dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_ALL_USERS_ERROR }));
};

export const getSingleUserDetails = (id) => (dispatch) => {
  dispatch({ type: GET_SINGLE_USER_DATA_REQUEST });
  return axios
    .get(`https://lestalk.onrender.com/single/${id}`)
    .then((res) =>
      dispatch({ type: GET_SINGLE_USER_DATA_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_SINGLE_USER_DATA_ERROR }));
};

export const updateUserFun = (id, userDetails) => (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/${id}`, userDetails)
    .then((res) =>
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data.user })
    )
    .catch((err) => dispatch({ type: UPDATE_USER_ERROR }));
};

// for changing profile picture
export const changeDpFun = (id, img) => (dispatch) => {
  dispatch({ type: CHANGE_DP_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/profile/${id}`, img)
    .then((res) => dispatch({ type: CHANGE_DP_SUCCESS, payload: res.data.user }))
    .catch((err) => dispatch({ type: CHANGE_DP_ERROR }));
};

export const getAllUnfollowedFriends = (id) => (dispatch) => {
  dispatch({ type: GET_ALL_FRIENDS_REQUEST });
  return axios
    .get(`https://lestalk.onrender.com/unfollowed/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ALL_FRIENDS_SUCCESS,
        payload: res.data.unfollowedPeople,
      })
    )
    .catch((err) => dispatch({ type: GET_ALL_FRIENDS_ERROR }));
};

export const followPeopleFun = (id, followId) => (dispatch) => {
  dispatch({ type: ADD_FRIEND_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/follow/${id}`, {
      followId,
    })
    .then((res) =>
      dispatch({ type: ADD_FRIEND_SUCCESS, payload: res.data.users })
    )
    .catch((err) => dispatch({ type: ADD_FRIEND_ERROR }));
};

export const unfollowFriend = (senderId, followId) => (dispatch) => {
  dispatch({ type: FRIEND_REQUEST_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/unfollow/${senderId}`, { followId })
    .then((res) => dispatch({ type: FRIEND_REQUEST_SUCCESS }))
    .catch((err) => dispatch({ type: FRIEND_REQUEST_ERROR }));
};

export const sendFriendRequest = (senderId, followId) => (dispatch) => {
  dispatch({ type: FRIEND_REQUEST_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/request/${senderId}`, { followId })
    .then((res) => dispatch({ type: FRIEND_REQUEST_SUCCESS }))
    .catch((err) => dispatch({ type: FRIEND_REQUEST_ERROR }));
};

export const cancelSendFriendRequest = (id, followId) => (dispatch) => {
  dispatch({ type: FRIEND_REQUEST_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/unrequest/${id}`, {
      followId,
    })
    .then((res) => dispatch({ type: FRIEND_REQUEST_SUCCESS }))
    .catch((err) => dispatch({ type: FRIEND_REQUEST_ERROR }));
};

export const cancelArrivingRequest = (id, followId) => (dispatch) => {
  dispatch({ type: FRIEND_REQUEST_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/reject/${id}`, {
      followId,
    })
    .then((res) => dispatch({ type: FRIEND_REQUEST_SUCCESS }))
    .catch((err) => dispatch({ type: FRIEND_REQUEST_ERROR }));
};

export const acceptFriendRequest = (id, followId) => (dispatch) => {
  dispatch({ type: FRIEND_REQUEST_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/accept/${id}`, {
      followId,
    })
    .then((res) => dispatch({ type: FRIEND_REQUEST_SUCCESS }))
    .catch((err) => dispatch({ type: FRIEND_REQUEST_ERROR }));
};

export const cancelAcceptedFriendRequest = (id, followId) => (dispatch) => {
  dispatch({ type: FRIEND_REQUEST_REQUEST });
  return axios
    .patch(`https://lestalk.onrender.com/accept/${id}`, {
      followId,
    })
    .then((res) => dispatch({ type: FRIEND_REQUEST_SUCCESS }))
    .catch((err) => dispatch({ type: FRIEND_REQUEST_ERROR }));
};

export const getFriendProfile = (id) => (dispatch) => {
  dispatch({ type: GET_FRIENDS_PROFILE_REQUEST });
  return axios
    .get(`https://lestalk.onrender.com/single/${id}`)
    .then((res) =>
      dispatch({ type: GET_FRIENDS_PROFILE_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_FRIENDS_PROFILE_ERROR }));
};
