import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Styles/Friends.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest,
  cancelArrivingRequest,
  cancelSendFriendRequest,
  getAllUnfollowedFriends,
  getSingleUserDetails,
  sendFriendRequest,
  unfollowFriend,
} from "../Redux/User/User.Actions";
import { getFriendPosts } from "../Redux/Posts/Post.action";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const { unfollowedPeople, userData } = useSelector((store) => store.user);
  const { id, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleUserDetails(id));
    dispatch(getAllUnfollowedFriends(id));
  }, []);

  // for handling the friend request
  const sendFriendRequestFun = (followId) => {
    dispatch(sendFriendRequest(id, followId))
      .then((res) => {
        if (res.type === "FRIEND_REQUEST_SUCCESS") {
          dispatch(getAllUnfollowedFriends(id));
          dispatch(getSingleUserDetails(id));
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("inside error catch", err));
  };

  const acceptFriendRequestFun = (followId) => {
    dispatch(acceptFriendRequest(id, followId)).then((res) => {
      if (res.type === "FRIEND_REQUEST_SUCCESS") {
        dispatch(getSingleUserDetails(id));
        dispatch(getAllUnfollowedFriends(id));
      }
    });
  };

  const cancelSendedRequestFun = (followId) => {
    dispatch(cancelSendFriendRequest(id, followId)).then((res) => {
      if (res.type === "FRIEND_REQUEST_SUCCESS") {
        dispatch(getSingleUserDetails(id));
        dispatch(getAllUnfollowedFriends(id));
      }
    });
  };

  const unfollowFriendFun = (followId) =>{
    dispatch(unfollowFriend(id,followId)).then((res) => {
      if (res.type === "FRIEND_REQUEST_SUCCESS") {
        dispatch(getSingleUserDetails(id));
        dispatch(getAllUnfollowedFriends(id));
      }
    });
  }
  const handleFriend = (friendId) => {
    dispatch(getFriendPosts(friendId, token));

    navigate(`/view/${friendId}`);
  };

  const cancelArrivingRequestFun = (friendId) => {
    dispatch(cancelArrivingRequest(id, friendId)).then((res) => {
      if (res.type === "FRIEND_REQUEST_SUCCESS") {
        dispatch(getSingleUserDetails(id));
        dispatch(getAllUnfollowedFriends(id));
      }
    });
  };

  return (
    <>
      <Sidebar />
      <div className="friends__container">
        <div style={{borderbottom:"1px solid lightgrey"}} className="requests">
          <h1 className="heading">Friend's Requests</h1>
          {userData?.requests !== undefined && userData.requests.length > 0 ? (
            userData.requests.map((el, ind) => {
              return (
                <div
                  className="friends__container_post"
                  key={ind}
                >
                  <div style={{display:'flex',width:"fit-content"}}>
                    <img
                      alt={el.name}
                      src={el.profile}
                      className="friends__container_post_img"
                    />
                    <h1 className="text">{el.name}</h1>
                  </div>
                  <div style={{display:"flex",gap:".5rem"}}>
                    <button
                      className="friends__container_post_btn"
                      onClick={() => acceptFriendRequestFun(el._id)}
                    >
                      Follow Back
                    </button>
                    <button
                    className="friends__container_post_btn"
                      onClick={() => cancelArrivingRequestFun(el._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="bighead">No requests now</h1>
          )}
        </div>
        <div style={{borderbottom:"1px solid lightgrey"}} className="not_in_your_list">
          <h1 className="heading">People you may know</h1>

          {unfollowedPeople.length > 0 ? (
            unfollowedPeople.map((el, ind) => (
              <div
              className="friends__container_post"
              key={ind}
              >
                <div style={{display:'flex',width:"fit-content"}}>
                  <img
                      alt={el.name}
                      src={el.profile}
                      className="friends__container_post_img"
                  />
                  <h1>{el.name}</h1>
                </div>
                <button
                  className="friends__container_post_btn"
                  onClick={() => sendFriendRequestFun(el._id)}
                >
                  Follow
                </button>
              </div>
            ))
          ) : (
            <h1 className="bighead">No people left to follow</h1>
          )}
        </div>
        <div style={{borderbottom:"1px solid lightgrey"}} className="friends" >
          <h1 className="heading">Your Friends</h1>

          {userData?.friends !== undefined && userData.friends.length > 0 ? (
            userData.friends.map((el, ind) => {
              return (
                <div
                className="friends__container_post"
                key={ind}
                >
                  <div style={{display:'flex',width:"fit-content"}}>
                    <img
                      alt={el.name}
                      src={el.profile}
                      className="friends__container_post_img"
                    />
                    <h1>{el.name}</h1>
                  </div >
                  <div style={{display:"flex",gap:".5rem"}}>

                  <button
                  className="friends__container_post_btn"
                    onClick={() => handleFriend(el._id)}
                    >
                    View
                  </button>
                  <button
                  className="friends__container_post_btn" onClick={()=>unfollowFriendFun(el._id)}>Unfollow</button>
                    </div>
                </div>
              );
            })
          ) : (
            <h1 className="bighead">😥 you have no friends mate</h1>
          )}
        </div>
        <div style={{borderbottom:"1px solid lightgrey"}}>
          <h1 className="heading">Requests that you send</h1>
          {userData?.sendedRequests !== undefined &&
          userData.sendedRequests.length > 0 ? (
            userData.sendedRequests.map((el, ind) => {
              return (
                <div
                className="friends__container_post"
                key={ind}
                >
                  <div style={{display:'flex',width:"fit-content"}}>
                    <img
                      alt={el.name}
                      src={el.profile}
                      className="friends__container_post_img"
                    />
                    <h1>{el.name}</h1>
                  </div>
                  <div style={{display:"flex",gap:".5rem"}}>
                    <button
                  className="friends__container_post_btn"
                      onClick={() => handleFriend(el._id)}
                    >
                      View
                    </button>
                    <button
                  className="friends__container_post_btn"
                      onClick={() => cancelSendedRequestFun(el._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="bighead"> No Requests sended by you</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
