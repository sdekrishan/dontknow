import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendProfile,
  getSingleUserDetails,
} from "../Redux/User/User.Actions";
import { BiSend } from "react-icons/bi";
import axios from "axios";
import {
  getMessagesOfChat,
  sendMessageToFriend,
} from "../Redux/Chat/Chat.Actions";
import Message from "./SubComponents/Message";
import { io } from "socket.io-client";
import { BsFillCircleFill } from "react-icons/bs";
const link = "wss://encouraging-marshy-ocarina.glitch.me/";

const Chats = () => {
  const dispatch = useDispatch();
  const { userData, friendProfile } = useSelector((store) => store.user);
  const { id } = useSelector((store) => store.auth);
  const [messageState, setMessageState] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const conversation = useRef(null);
  const [upcomingMessages, setUpcomingMessages] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [friendsData, setFriendsData] = useState(
    friendProfile._id ? friendProfile : {}
  );
  const chatBoxRef = useRef(null);
  const socket = useRef(null);
  const chatBoxRefBig = useRef(null);

  useEffect(() => {
    socket.current = io(link);
    socket.current.on("getmsg", (data) => {
      console.log("receiveMsg", data);
      setUpcomingMessages({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    upcomingMessages && setMessageState([...messageState, upcomingMessages]);
    // upcomingMessages && conversation.current?.members.includes(upcomingMessages.senderId) && setMessageState(prev=> [...prev,upcomingMessages])
  }, [upcomingMessages]);

  useEffect(() => {
    if (!userData._id) {
      console.log("userData inside useEffect", userData);
      dispatch(getSingleUserDetails(id));
    }
  }, []);

  useEffect(() => {
    socket.current?.emit("adduser", userData._id);
    socket.current?.on("getuser", (users) => {
      userData.friends &&
        setOnlineFriends(
          userData.friends.filter((user) =>
            users.some((person) => person.userId === user._id)
          )
        );
    });
  }, [userData]);

  useEffect(() => {
    axios
      .get(`https://lestalk.onrender.com/message/${conversation.current?._id}`)
      .then((res) => setMessageState(res.data))
      .catch((err) => console.log(err));
    // dispatch(getMessagesOfChat(conversation.current?._id)).then(res => setMessageState(res.payload))
  }, [conversation.current]);

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleChat = (friendId) => {
    dispatch(getFriendProfile(friendId)).then((res) =>
      setFriendsData(res.payload)
    );

    axios
      .get(
        `https://lestalk.onrender.com/chat/getchat/${userData._id}/${friendId}`
      )
      .then((res) => {
        if (res.data.already) {
          // setConversation(res.data.userChat[0])
          conversation.current = res.data.userChat[0];
        } else {
          axios
            .post("https://lestalk.onrender.com/chat", {
              senderId: userData._id,
              receiverId: friendId,
            })
            .then((res) => {
              conversation.current = res.data;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log("err", err));

    dispatch(getMessagesOfChat(conversation.current?._id)).then((res) =>
      setMessageState(res.payload)
    );
  };

  useEffect(() => {
    chatBoxRef?.current?.scrollIntoView({ behavior: "smooth" });
    chatBoxRefBig?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageState]);

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      const receiverId = conversation.current?.members.find(
        (member) => member !== userData._id
      );
      socket.current.emit("sendMessage", {
        senderId: userData._id,
        receiverId,
        text: messageInput,
      });
      dispatch(
        sendMessageToFriend(
          conversation.current._id,
          userData?._id,
          messageInput
        )
      ).then((res) => setMessageState([...messageState, res.payload]));
      setMessageInput("");
    }
  };

  const handleSendMessage = () => {
    const receiverId = conversation.current.members.find(
      (member) => member !== userData._id
    );
    socket.current.emit("sendMessage", {
      senderId: userData._id,
      receiverId,
      text: messageInput,
    });
    dispatch(
      sendMessageToFriend(conversation.current._id, userData?._id, messageInput)
    );
    setMessageInput("");
  };

  return (
    <>
      <Sidebar />
      <Box
        ml="25vw"
        p="1rem"
        minH={"100vh"}
        display={{ base: "none", sm: "none", md: "block" }}
      >
        <Flex h="90vh" borderRadius={".5rem"} border="1px solid lightgrey">
          <Box w="35%" overflowY={"scroll"} p=".5rem">
            <Flex
              gap=".5rem"
              alignItems={"center"}
              borderBottom="1px solid lightgrey"
              p=".3rem"
            >
              <Image
                src={userData.name && userData.profile}
                w="40px"
                h="40px"
                borderRadius={"50%"}
              />
              <Text
                fontSize={"1.2rem"}
                fontWeight={"semibold"}
                fontStyle={"oblique"}
              >
                {userData.name && userData.name}
              </Text>
            </Flex>

            <Flex alignItems={"center"} gap=".3rem" mt=".5rem">
              <Text className="text">Online Friends </Text>
              <Box>
                <BsFillCircleFill color="#05B714" size={"10px"} />
              </Box>
            </Flex>
            <Box marginBlock={"1rem"} pb="1rem">
              {onlineFriends &&
                onlineFriends.map((friend) => (
                  <Flex
                    key={friend._id}
                    p=".6rem"
                    w="full"
                    borderBottom={"1px solid lightgrey"}
                    alignItems={"center"}
                    onClick={() => handleChat(friend._id)}
                    gap="1rem"
                  >
                    <Image
                      src={friend.profile}
                      w="30px"
                      h="30px"
                      borderRadius={"50%"}
                    />
                    <Flex alignItems={"center"} gap=".3rem">
                      <Text className="text">{friend.name}</Text>
                      <Box>
                        <BsFillCircleFill color="#05B714" size={"10px"} />
                      </Box>
                    </Flex>
                  </Flex>
                ))}
            </Box>

            <Box marginBlock={"1rem"} pb="1rem">
              <Text className="text" textAlign={"left"}>
                All Friends
              </Text>
              {userData.friends &&
                userData.friends.map((friend) => (
                  <Flex
                    key={friend._id}
                    p=".5rem"
                    borderBottom="1px solid lightgrey"
                    alignItems={"center"}
                    gap="1rem"
                    onClick={() => handleChat(friend._id)}
                  >
                    <Image
                      src={friend.profile}
                      w="40px"
                      h="40px"
                      borderRadius={"50%"}
                    />
                    <Text className="text">{friend.name}</Text>
                  </Flex>
                ))}
            </Box>
          </Box>
          <Box position={"relative"} w="65%">
            {friendsData._id ? (
              <>
                <Flex
                  p=".7rem"
                  postition="absolute"
                  top={"0"}
                  left="0"
                  borderBottom={"1px solid lightgrey"}
                  h="10%"
                  gap=".5rem"
                  alignItems={"center"}
                >
                  <Image
                    src={friendsData.profile}
                    w="40px"
                    h="40px"
                    borderRadius={"50%"}
                  />
                  <Text>{friendsData.name}</Text>
                </Flex>

                <Box
                  h="81%"
                  className="chat-box"
                  overflowY={"scroll"}
                  paddingInline={"5px"}
                >
                  {!messageState.includes(null) &&
                    messageState.map((message, index) => {
                      return (
                        <Box key={index} ref={chatBoxRefBig}>
                          <Message
                            check={
                              message.senderId === userData._id ? true : false
                            }
                            userMsg={message.text}
                          />
                        </Box>
                      );
                    })}
                </Box>

                <Flex
                  h="9%"
                  className="msg-sender"
                  borderTop="1px solid lightgrey"
                  position="absolute"
                  bottom="0"
                  left="0"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  w="full"
                >
                  <Input
                    value={messageInput}
                    onKeyDown={handleEnterKey}
                    onChange={handleMessageChange}
                    type="text"
                    placeholder="Send Message"
                  />
                  <Box p=".5rem" borderRadius={"25%"}>
                    <BiSend size="1.3rem" onClick={handleSendMessage} />
                  </Box>
                </Flex>
              </>
            ) : (
              <Text
                p="1rem"
                position={"absolute"}
                top="50%"
                left="50%"
                transform={`translate(-50%,-50%)`}
                display={"block"}
                w="full"
                color="#c1c1c1"
                fontSize={"2rem"}
                fontWeight={"bold"}
                textAlign={"justify"}
              >
                Open conversation to Start a Chat 🤩
              </Text>
            )}
          </Box>
        </Flex>
      </Box>

      <Box
        w="full"
        h={"80vh"}
        display={{ base: "block", sm: "block", md: "none" }}
        position={"fixed"}
        top="3.5rem"
        left="0"
      >
        <Flex overflowX={"scroll"} gap=".5rem" p=".5rem" h="12%">
          {onlineFriends.length > 0 ? (
            onlineFriends.map((friend, index) => (
              <Flex
                key={index}
                p="1rem"
                mr=".5rem"
                w="max-content"
                alignItems={"center"}
                onClick={() => handleChat(friend._id)}
                gap="1rem"
              >
                <Image
                  src={friend.profile}
                  w="30px"
                  h="30px"
                  borderRadius={"50%"}
                />
                <Flex alignItems={"center"} gap=".3rem" p=".3rem">
                  <Text className="text">{friend.name}</Text>
                  <Box>
                    {onlineFriends.find(
                      (userId) => userId._id === friend._id
                    ) ? (
                      <BsFillCircleFill color="#05B714" size={"10px"} />
                    ) : (
                      <BsFillCircleFill color="black" size={"10px"} />
                    )}
                  </Box>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text className="bighead" textAlign={"center"}>
              {" "}
              No Friend is Online
            </Text>
          )}
        </Flex>
        <Box w="100%" h="88%">
          {friendsData._id ? (
            <>
              <Flex
                p=".7rem"
                h="12%"
                gap=".5rem"
                mr=".5rem"
                alignItems={"center"}
              >
                <Image
                  src={friendsData?.profile}
                  w="30px"
                  h="30px"
                  borderRadius={"50%"}
                />
                <Text>{friendsData?.name}</Text>
              </Flex>

              <Box
                h="76%"
                className="chat-box"
                overflowY={"scroll"}
                paddingInline={"5px"}
              >
                {!messageState.includes(null) &&
                  messageState.map((message, index) => {
                    return (
                      <Box key={index} ref={chatBoxRef}>
                        <Message
                          check={
                            message.senderId === userData._id ? true : false
                          }
                          userMsg={message.text}
                        />
                      </Box>
                    );
                  })}
              </Box>

              <Flex
                h="12%"
                className="msg-sender"
                borderTop="1px solid lightgrey"
                alignItems={"center"}
                justifyContent={"space-between"}
                w="full"
              >
                <Input
                  value={messageInput}
                  onKeyDown={handleEnterKey}
                  onChange={handleMessageChange}
                  type="text"
                  placeholder="Send Message"
                />
                <Box p=".5rem" borderRadius={"25%"}>
                  <BiSend size="1.3rem" onClick={handleSendMessage} />
                </Box>
              </Flex>
            </>
          ) : (
            <Text
              p="1rem"
              position={"absolute"}
              top="50%"
              left="50%"
              transform={`translate(-50%,-50%)`}
              display={"block"}
              w="full"
              color="#c1c1c1"
              fontSize={"2rem"}
              fontWeight={"bold"}
              textAlign={"justify"}
            >
              Open conversation to Start a Chat 🤩
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chats;
