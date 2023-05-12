import {
  ADD_COMMENT_ERROR,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_FRIEND_POSTS_ERROR,
  GET_FRIEND_POSTS_REQUEST,
  GET_FRIEND_POSTS_SUCCESS,
  GET_SINGLE_USER_POSTS_ERROR,
  GET_SINGLE_USER_POSTS_REQUEST,
  GET_SINGLE_USER_POSTS_SUCCESS,
  GET_SINGLE_USER_PROFILE_POSTS_ERROR,
  GET_SINGLE_USER_PROFILE_POSTS_REQUEST,
  GET_SINGLE_USER_PROFILE_POSTS_SUCCESS,
  LIKE_ERROR,
  LIKE_REQUEST,
  LIKE_SUCCESS,
} from "./Post.ActionTypes";
import axios from "axios";
//for getting single user posts user+friends post
export const getSingleUserPosts = (id, token) => (dispatch) => {
  dispatch({ type: GET_SINGLE_USER_POSTS_REQUEST });
  return axios
    .get(`https://dontknow-6zckggalj-sdekrishan.vercel.app/posts/all/${id}`, {
      headers: {
        "Content-type": "aplication/json",
        authorization: token,
      },
    })
    .then((res) =>
      dispatch({ type: GET_SINGLE_USER_POSTS_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_SINGLE_USER_POSTS_ERROR }));
};

//for getting a particular user's posts

export const getFriendPosts = (id, token) => (dispatch) => {
  dispatch({ type: GET_FRIEND_POSTS_REQUEST });
  return axios
    .get(`https://dontknow-6zckggalj-sdekrishan.vercel.app/posts/${id}`, {
      headers: {
        "Content-type": "aplication/json",
        authorization: token,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_FRIEND_POSTS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_FRIEND_POSTS_ERROR }));
};

export const getSingleUserProfilePosts = (id, token) => (dispatch) => {
  dispatch({ type: GET_SINGLE_USER_PROFILE_POSTS_REQUEST });
  return axios
    .get(`https://dontknow-6zckggalj-sdekrishan.vercel.app/posts/${id}`, {
      headers: {
        "Content-type": "aplication/json",
        authorization: token,
      },
    })
    .then((res) =>
      dispatch({
        type: GET_SINGLE_USER_PROFILE_POSTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch({ type: GET_SINGLE_USER_PROFILE_POSTS_ERROR }));
};

export const createNewPost = (id, details, token) => (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  return axios
    .post(
      `https://dontknow-bo9h8x51m-sdekrishan.vercel.app/posts/create/${id}`,
      details,
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) =>
      dispatch({ type: CREATE_POST_SUCCESS, payload: res.data.post })
    )
    .catch((err) => dispatch({ type: CREATE_POST_ERROR }));
};

export const likeFunction = (id, postId, token) => (dispatch) => {
  dispatch({ type: LIKE_REQUEST });
  return axios
    .patch(
      `https://dontknow-6zckggalj-sdekrishan.vercel.app/posts/like/${postId}`,
      id,
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) => dispatch({ type: LIKE_SUCCESS, payload: res.data.posts }))
    .catch((err) => dispatch({ type: LIKE_ERROR }));
};

export const addCommentFun = (id, comment, token) => (dispatch) => {
  dispatch({ type: ADD_COMMENT_REQUEST });
  return axios
    .patch(
      `https://dontknow-6zckggalj-sdekrishan.vercel.app/posts/comment/${id}`,
      comment,
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) => dispatch({ type: ADD_COMMENT_SUCCESS }))
    .catch((err) => dispatch({ type: ADD_COMMENT_ERROR }));
};

export const deletePost = (id, token) => (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });
  return axios
    .delete(
      `https://dontknow-6zckggalj-sdekrishan.vercel.app/posts/delete/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) => dispatch({ type: DELETE_POST_SUCCESS }))
    .catch((err) => dispatch({ type: DELETE_POST_ERROR }));
};
