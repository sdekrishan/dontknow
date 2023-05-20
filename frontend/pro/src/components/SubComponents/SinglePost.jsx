import {
  Box,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentFun,
  getSingleUserPosts,
  likeFunction,
} from "../../Redux/Posts/Post.action";
import {
  BsChatDots,
  BsFillEmojiFrownFill,
  BsFillEmojiHeartEyesFill,
} from "react-icons/bs";
import "./Styles/SinglePost.scss"
import { AiOutlineSend } from "react-icons/ai";
import CommentLoader from "./CommentLoader";
import axios from "axios";


const SinglePost = ({ postData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const [currentPost, setCurrentPost] = useState({});
  const [likesArr, setLikesArr] = useState(
    postData.likes !== undefined ? postData.likes : []
  );
  const { id, token } = useSelector((store) => store.auth);
  const { isLoading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const handleLikeButton = (postId) => {
    setLikesArr(
      likesArr.includes(id)
        ? likesArr.filter((el) => el !== id)
        : [...likesArr, id]
    );

    dispatch(likeFunction(id, postId, token));
  };

  //for setting the comment
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSendComment = (post) => {
    const commentData = { comment, userId: id };
    dispatch(addCommentFun(post._id, commentData, token))
      .then((response) => {
        if (response.type === "ADD_COMMENT_SUCCESS") {
          axios.get(`https://lestalk.onrender.com/posts/allposts/${id}`,{
            headers:{
              authorization:token
            }
          }).then(res => {
              const data = res.data.posts.find((el) => el._id === post._id);
            setCurrentPost(data);
          }).catch(err => console.log(err))
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className="singlepost_container"
      >
        <Flex
          alignItems={"center"}
          width={"max-content"}
          marginBlock='.7rem'
          justifyContent={"space-between"}
        >
          <Image
            boxSize={"40px"}
            borderRadius={"full"}
            mr={'.7rem'}
            src={postData.userDetails.profile}
          />
          <Text
            fontSize={"xl"}
            textAlign={"left"}
            fontStyle={"italic"}
            fontWeight={"bold"}
          >
            {postData.userDetails.name}
          </Text>
        </Flex>
        <Box w='full'>
        {postData.picture ? (
          <Image width={"468px"} borderRadius={'.5rem'} h='auto' src={postData.picture} />
        ) : (
          ""
        )}
        </Box>
        <Flex
          paddingInline="1rem"
          w="120px"
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBlock={'.5rem'}
        >
          {likesArr.includes(id) ? (
            <Box w={{base:'1.2rem',sm:"1.5rem",md:"1.7rem",lg:"1.7rem"}}>
              <BsFillEmojiHeartEyesFill
              size={'100%'}
                onClick={() => handleLikeButton(postData._id)}
                color="red"
              />
          {likesArr.length}
            </Box>
          ) : (
            <Box w={{base:'1.2rem',sm:"1.5rem",md:"1.7rem",lg:"1.7rem"}}>
              <BsFillEmojiFrownFill
              size={'100%'}
                onClick={() => handleLikeButton(postData._id)}
                color="black"
              />
          {likesArr.length}
            </Box>
          )}
          <Box w={{base:'1.2rem',sm:"1.5rem",md:"1.7rem",lg:"1.7rem"}}>
          <BsChatDots
            size="100%"
            onClick={() => {
              setCurrentPost(postData);
              onOpen();
            }}
          />
          {postData.comments.length}
          </Box>
        </Flex>
        <Flex marginBlock={'.5rem'}> 
        <Text fontWeight={'bold'} textAlign={"left"}>{postData.userDetails.name}</Text>
        <Text ml='1rem' textAlign={"left"}>{postData.content}</Text>
        </Flex>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"} maxH={"400px"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Input
                name="comment"
                type="text"
                w="90%"
                onChange={(e) => handleComment(e)}
              />
              <AiOutlineSend
                size={"6%"}
                onClick={() => handleSendComment(currentPost)}
              />
            </Flex>

            {isLoading ? (
              <CommentLoader/>
            ) : (
              <Box>
                {currentPost._id &&
                  currentPost.comments.map((comment, index) => {
                    return (
                      <Box
                        key={comment._id}
                        borderBottom="1px solid lightgrey"
                        mb=".5rem"
                        p=".5rem"
                      >
                        <Flex
                          padding={".5rem"}
                          w="fit-content"
                          alignItems={'center'}
                          borderBottom="1px solid lightgrey"
                          gap='.5rem'
                        >
                          <Image
                            src={
                              comment.userId === userData._id
                                ? userData.profile
                                : currentPost.commentDetails[index].profile
                            }
                            border="1px solid black"
                            w="40px"
                            h="40px"
                            borderRadius={"50%"}
                          ></Image>
                          <Text>
                            {comment.userId === userData._id
                              ? userData.name
                              : currentPost.commentDetails[index].name}
                          </Text>
                        </Flex>
                        <Text>{comment.comment}</Text>
                      </Box>
                    );
                  })}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SinglePost;
