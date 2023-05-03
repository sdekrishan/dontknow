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
} from "../Redux/Posts/Post.action";
import {
  BsChatDots,
  BsFillEmojiFrownFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

const SinglePost = ({ postData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const [currentPost, setCurrentPost] = useState({});
  const [likesArr, setLikesArr] = useState(
    postData.likes !== undefined ? postData.likes : []
  );
  const [likes, setLikes] = useState(postData.likes.length);
  const { id, token } = useSelector((store) => store.auth);
  const { isLoading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const handleLikeButton = (postId) => {
    
    setLikesArr(
      likesArr.includes(id)
        ? likesArr.filter((el) => el !== id)
        : [...likesArr,id]
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
          dispatch(getSingleUserPosts(id, token)).then((res) => {
            const data = res.payload.posts.find((el) => el._id === post._id);
            setCurrentPost(data);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Flex
        w="80%"
        padding={"1rem"}
        borderRadius={"1rem"}
        marginInline={"auto"}
        h="fit-content"
        border="1px solid lightgray"
        direction={"column"}
      >
        <Flex
          alignItems={"center"}
          width={"85px"}
          justifyContent={"space-between"}
        >
          <Image
            boxSize={"40px"}
            borderRadius={"full"}
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
        <Text textAlign={"left"}>{postData.content}</Text>
        {postData.picture ? (
          <Image boxSize={"280px"} src={postData.picture} />
        ) : (
          ""
        )}
        <Flex
          p="1rem"
          w="120px"
          justifyContent={"space-between"}
          alignItems={"center"}
          border="1px solid black"
        >
          {/* <BsBalloonHeart size={'2rem'} onClick={()=>handleLikeButton(el._id)} color={el.likes.includes(id)? "red":"black"} /> */}
          {likesArr.includes(id) ? (
            <BsFillEmojiSmileFill
              size={"1.7rem"}
              onClick={() => handleLikeButton(postData._id)}
              color="red"
            />
          ) : (
            <BsFillEmojiFrownFill
              size={"1.7rem"}
              onClick={() => handleLikeButton(postData._id)}
              color="green"
            />
          )}
          {likesArr.length}
          <BsChatDots
            size="1.8rem"
            onClick={() => {
              setCurrentPost(postData);
              onOpen();
            }}
          />{postData.comments.length}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"} maxH={"400px"}>
            <Flex
              border="1px solid black"
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
              <h1>Loading...</h1>
            ) : (
              <Box>
                {currentPost._id &&
                  currentPost.comments.map((comment, index) => {
                    return (
                      <Box
                        key={comment._id}
                        border="1px solid black"
                        mb=".5rem"
                        p=".5rem"
                      >
                        <Flex
                          padding={".5rem"}
                          w="fit-content"
                          border="1px solid black"
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
