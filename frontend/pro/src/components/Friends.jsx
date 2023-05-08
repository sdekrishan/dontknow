import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
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
      <Flex
        ml={{ sm: "0", md: "25vw" }}
        direction={"column"}
        mt={{ base: "3rem", sm: "3rem", md: "0" }}
        mb={{ base: "4.5rem", sm: "4.5rem" }}
        gap={"1rem"}
        p="2rem 1rem"
      >
        <Box borderBottom={"1px solid black"} className="requests">
          <Text className="heading">Friend's Requests</Text>
          {userData?.requests !== undefined && userData.requests.length > 0 ? (
            userData.requests.map((el, ind) => {
              return (
                <Flex
                  padding={".4rem"}
                  key={ind}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  borderBottom="1px solid lightgrey"
                  cursor={"pointer"}
                >
                  <Flex w="fit-content">
                    <Image
                      src={el.profile}
                      w="30px"
                      h="30px"
                      mr=".7rem"
                      borderRadius={"50%"}
                    />
                    <Text>{el.name}</Text>
                  </Flex>
                  <Flex gap={".5rem"}>
                    <Button
                      colorScheme="blue"
                      onClick={() => acceptFriendRequestFun(el._id)}
                    >
                      Follow Back
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => cancelArrivingRequestFun(el._id)}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              );
            })
          ) : (
            <h1 className="bighead">No requests now</h1>
          )}
        </Box>
        <Box borderBottom={"1px solid black"} className="not_in_your_list">
          <Text className="heading">People you may know</Text>

          {unfollowedPeople.length > 0 ? (
            unfollowedPeople.map((el, ind) => (
              <Flex
                padding={".4rem"}
                key={ind}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderBottom="1px solid lightgrey"
                cursor={"pointer"}
              >
                <Flex w="fit-content">
                  <Image
                    src={el.profile}
                    w="30px"
                    h="30px"
                    mr=".7rem"
                    borderRadius={"50%"}
                  />
                  <Text>{el.name}</Text>
                </Flex>
                <Button
                  colorScheme="blue"
                  onClick={() => sendFriendRequestFun(el._id)}
                >
                  Follow
                </Button>
              </Flex>
            ))
          ) : (
            <h1 className="bighead">No people left to follow</h1>
          )}
        </Box>
        <Box borderBottom={"1px solid black"} className="friends" >
          <Text className="heading">Your Friends</Text>

          {userData?.friends !== undefined && userData.friends.length > 0 ? (
            userData.friends.map((el, ind) => {
              return (
                <Flex
                  padding={".4rem"}
                  key={ind}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  borderBottom="1px solid lightgrey"
                  cursor={"pointer"}
                >
                  <Flex w="fit-content">
                    <Image
                      src={el.profile}
                      w="30px"
                      h="30px"
                      mr=".7rem"
                      borderRadius={"50%"}
                    />
                    <Text>{el.name}</Text>
                  </Flex >
                  <Flex gap='.5rem'>

                  <Button
                    colorScheme="blue"
                    onClick={() => handleFriend(el._id)}
                    >
                    View
                  </Button>
                  <Button colorScheme="blue" onClick={()=>unfollowFriendFun(el._id)}>Unfollow</Button>
                    </Flex>
                </Flex>
              );
            })
          ) : (
            <h1 className="bighead">😥 you have no friends mate</h1>
          )}
        </Box>
        <Box borderBottom={"1px solid black"}>
          <Text className="heading">Requests that you send</Text>
          {userData?.sendedRequests !== undefined &&
          userData.sendedRequests.length > 0 ? (
            userData.sendedRequests.map((el, ind) => {
              return (
                <Flex
                  padding={".4rem"}
                  key={ind}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  borderBottom="1px solid lightgrey"
                  cursor={"pointer"}
                >
                  <Flex w="fit-content">
                    <Image
                      src={el.profile}
                      w="30px"
                      h="30px"
                      mr=".7rem"
                      borderRadius={"50%"}
                    />
                    <Text>{el.name}</Text>
                  </Flex>
                  <Flex gap=".5rem">
                    <Button
                      colorScheme="blue"
                      onClick={() => handleFriend(el._id)}
                    >
                      View
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => cancelSendedRequestFun(el._id)}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              );
            })
          ) : (
            <h1 className="bighead"> No Requests sended by you</h1>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Friends;
