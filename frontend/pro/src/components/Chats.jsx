import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendProfile, getSingleUserDetails } from "../Redux/User/User.Actions";
import { BiSend } from "react-icons/bi";
import axios from "axios";
import { getMessagesOfChat, sendMessageToFriend } from "../Redux/Chat/Chat.Actions";
import Message from "./SubComponents/Message";
import {io} from 'socket.io-client';
const link = 'http://localhost:8000'

const Chats = () => {
  const dispatch = useDispatch();
  const { userData, friendProfile } = useSelector((store) => store.user);
  const {id} = useSelector(store => store.auth)
  const [messageState, setMessageState] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const conversation = useRef(null);
  const [upcomingMessages, setUpcomingMessages] = useState(null)
  const [messageInput, setMessageInput] = useState("");
  const [friendsData, setFriendsData] = useState(
    friendProfile._id ? friendProfile : {}
  );
  const chatBoxRef = useRef(null);
  const socket = useRef(null)

    console.log('messagesSTate', messageState);
  useEffect(()=>{
    socket.current = io(link);
    socket.current.on("getmsg",(data)=>{
      console.log('receiveMsg',data);
      setUpcomingMessages({
        senderId:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
      console.log('upcom',upcomingMessages);
    })
  },[])
  
  useEffect(()=>{
    if(!userData.id){
      console.log('userData inside useEffect',userData);
      dispatch(getSingleUserDetails(id))
    }
  },[])
  
  useEffect(()=>{
    setMessageState([...messageState,upcomingMessages]);
    // upcomingMessages && conversation.current?.members.includes(upcomingMessages.senderId) && setMessageState(prev=> [...prev,upcomingMessages])
  },[upcomingMessages,conversation.current])


  useEffect(()=>{
    socket.current?.emit("adduser",userData._id)
    socket.current?.on("getuser",(users)=>{
      console.log('getuser chat ',users);
     userData.friends && setOnlineFriends(userData.friends.filter(user => users.some((person)=> person.userId === user._id)))
  })
},[userData])

useEffect(()=>{
  axios.get(`http://localhost:8080/message/${conversation.current?._id}`)
    .then(res => setMessageState(res.data))
    .catch(err => console.log(err))
  // dispatch(getMessagesOfChat(conversation.current?._id)).then(res => setMessageState(res.payload))
},[conversation.current]);

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
        // setConversation(res.data.userChat[0])
        conversation.current = res.data.userChat[0]
      }else{
        axios.post("http://localhost:8080/chat",{senderId:userData._id,receiverId:friendId})
        .then(res => {
          conversation.current = res.data
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log("err",err))

    dispatch(getMessagesOfChat(conversation.current?._id)).then(res => setMessageState(res.payload))
  };

  useEffect(()=>{
    chatBoxRef?.current?.scrollIntoView({behavior:'smooth'})
  },[messageState])


  const handleEnterKey =(event)=>{
    if(event.key === 'Enter'){
      const receiverId = conversation.current?.members.find(member => member!== userData._id)
      socket.current.emit("sendMessage",({senderId:userData._id,receiverId,text:messageInput}))
      // axios.post(`http://localhost:8080/message/${conversation.current?._id}`,{senderId:userData._id,text:messageInput})
      // .then(res => setMessageState([...messageState,res.payload]))
      // .catch(err => console.log(err))
      dispatch(sendMessageToFriend(conversation.current._id,userData?._id,messageInput)).then(res => setMessageState([...messageState,res.payload]))
      setMessageInput('')
    }
  }

  const handleSendMessage =()=>{
    const receiverId = conversation.current.members.find(member => member!== userData._id)
    socket.current.emit("sendMessage",({senderId:userData._id,receiverId,text:messageInput}))  
    dispatch(sendMessageToFriend(conversation.current._id,userData?._id,messageInput))
    // axios.post(`http://localhost:8080/message/${conversation.current?._id}`,{senderId:userData._id,text:messageInput})
    //   .then(res => setMessageState([...messageState,res.payload]))
    //   .catch(err => console.log(err))
    setMessageInput("")
  }
 

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
                  {!messageState.includes(null)  && messageState.map((message,index)=>{
                    return <Box key={index} ref={chatBoxRef}>
                      <Message  check={message.senderId === userData._id ? true : false} userMsg={message.text}/>
                    </Box>
                  })}
                </Box>


                <Flex h='9%' className="msg-sender" border='1px solid red' position='absolute' bottom='0' left='0' alignItems={'center'} justifyContent={'space-between'} w='full'>
                    <Input value={messageInput} onKeyDown={handleEnterKey} onChange={handleMessageChange} type='text' placeholder="Send Message" />
                    <Box p='.5rem' borderRadius={'25%'} border='1px solid black'>
                    <BiSend size='1.3rem' onClick={handleSendMessage} />
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
