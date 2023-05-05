import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendProfile } from "../Redux/User/User.Actions";
import { BiSend } from "react-icons/bi";
import axios from "axios";

const Chats = () => {
  const { userData, friendProfile } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [conversation, setConversation] = useState([]);
  const [messages , setMessages ] = useState([]);

  const [friendsData, setFriendsData] = useState(
    friendProfile._id ? friendProfile : {}
  );
  const handleChat = (friendId) => {
    dispatch(getFriendProfile(friendId)).then((res) =>
      setFriendsData(res.payload)
    );
    console.log('getchat',userData._id,friendId);
    const serverPayload = {
      senderId:userData._id,
      receiverId:friendId
    }
    console.log('serverPayload',serverPayload);
    axios.get(`http://localhost:8080/chat/getchat/${userData._id}?senderId=${friendId}`)
    .then(res => console.log("res",res))
    .catch(err => console.log("err",err))
  };

  //for checking if we have earlier chats or not

  // useEffect(()=>{
  //   axios.get("/chat/all",{})
  // },[])
  return (
    <>
      <Sidebar />
      <Box ml="25vw" border="1px solid black" p="1rem" minH={"100vh"}>
        <Flex border="1px solid red" h="90vh">
          <Box border={"1px solid green"} w="35%">
            {userData.friends &&
              userData.friends.map((friend) => (
                <Flex
                  key={friend._id}
                  p="1rem"
                  border="1px solid black"
                  w="fit-content"
                  onClick={() => handleChat(friend._id)}
                >
                  <Image
                    src={friend.profile}
                    w="30px"
                    h="30px"
                    borderRadius={"50%"}
                  />
                  <Text>{friend.name}</Text>
                </Flex>
              ))}
          </Box>
            {friendsData._id ? (
          <Box border="1px solid brown" w="65%" position={'relative'} >
                
                <Flex 
                p=".7rem"
                postition='absolute'
                top={'0'}
                left='0'
                border='1px solid black'
                h='10%'
                alignItems={'center'}
                >
                  <Image
                    src={friendsData.profile}
                    w="40px"
                    h="40px"
                    borderRadius={"50%"}
                  />
                  <Text>{friendsData.name}</Text>
                </Flex>
                <Box h='81%' className="chat-box"  border='2px solid brown'></Box>
                <Flex h='9%' className="msg-sender" border='1px solid red' position='absolute' bottom='0' left='0' alignItems={'center'} justifyContent={'space-between'} w='full'>
                    <Input type='text' placeholder="Send Message" />
                    <Box p='.5rem' borderRadius={'25%'} border='1px solid black'>
                    <BiSend size='1.3rem' />
                    </Box>
                </Flex>
          </Box>
            ) : (
              <Text>Start a Chat 🤩</Text>
            )}
        </Flex>
      </Box>
    </>
  );
};

export default Chats;
