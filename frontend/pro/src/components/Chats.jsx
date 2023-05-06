import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendProfile } from "../Redux/User/User.Actions";
import { BiSend } from "react-icons/bi";
import axios from "axios";
import { getMessagesOfChat, sendMessageToFriend } from "../Redux/Chat/Chat.Actions";
import Message from "./SubComponents/Message";

const Chats = () => {
  const { userData, friendProfile } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [conversation, setConversation] = useState(null);
  const {messages} = useSelector(store => store.chat);
  const [messageInput, setMessageInput] = useState("");
  const chatBoxRef = useRef(null);

  const [friendsData, setFriendsData] = useState(
    friendProfile._id ? friendProfile : {}
  );

  const handleMessageChange = (event) =>{
    setMessageInput(event.target.value)
  }

  const handleChat = (friendId) => {
    dispatch(getFriendProfile(friendId)).then((res) =>
      setFriendsData(res.payload)
    );
    axios.get(`http://localhost:8080/chat/getchat/${userData._id}/${friendId}`)
    .then(res => {
      if(res.data.already){
        console.log('res',res);
        setConversation(res.data.userChat[0]._id)
      }else{
        axios.post("http://localhost:8080/chat",{senderId:userData._id,receiverId:friendId})
        .then(res => {
          setConversation(res.data._id)
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log("err",err))
    dispatch(getMessagesOfChat(conversation))
  };

  useEffect(()=>{
    dispatch(getMessagesOfChat(conversation))
  },[conversation]);

  useEffect(()=>{
    console.log('chatBoxRef.current',chatBoxRef);
    chatBoxRef?.current?.scrollIntoView({behavior:'smooth'})

  },[messages])

  const handleEnterKey =(event)=>{
    if(event.key === 'Enter'){
      dispatch(sendMessageToFriend(conversation,userData?._id,messageInput))
      setMessageInput('')
    }
  }
console.log('messages',messages);
console.log('userData',userData);

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


                <Box h='81%' className="chat-box" overflowY={'scroll'}  border='2px solid brown' paddingInline={'5px'}>
                  {messages && messages.map((message)=>{
                    return <Box key={message._id} ref={chatBoxRef}>
                      <Message  check={message.senderId === userData._id ? true : false} userMsg={message.text}/>
                    </Box>
                  })}
                </Box>


                <Flex h='9%' className="msg-sender" border='1px solid red' position='absolute' bottom='0' left='0' alignItems={'center'} justifyContent={'space-between'} w='full'>
                    <Input value={messageInput} onKeyDown={handleEnterKey} onChange={handleMessageChange} type='text' placeholder="Send Message" />
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
