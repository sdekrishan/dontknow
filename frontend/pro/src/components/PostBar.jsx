import { Box, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";

import SinglePost from "./SinglePost";

const PostBar = ({ data, loading }) => {
  // console.log('checking',userData._id === currentPost.comments.userId);
  // if(loading){
  //   return <>
  //     <Text fontSize={'3xl'}>PostBar</Text>
  //   <Box padding="6" boxShadow="lg" bg="white">
  //   <SkeletonCircle size="10" />
  //   <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  // </Box>
  // <Box padding="6" boxShadow="lg" bg="white">
  //   <SkeletonCircle size="10" />
  //   <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  // </Box>
  // <Box padding="6" boxShadow="lg" bg="white">
  //   <SkeletonCircle size="10" />
  //   <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  // </Box>
  // <Box padding="6" boxShadow="lg" bg="white">
  //   <SkeletonCircle size="10" />
  //   <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  // </Box>
  // <Box padding="6" boxShadow="lg" bg="white">
  //   <SkeletonCircle size="10" />
  //   <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  // </Box>
  //   </>
  // }
  console.log('data',data);
  return (
    <>
      <Text fontSize={"3xl"}>PostBar</Text>
      {data ? (
        <Box>
          {data.length > 0 &&
            data?.map((el, ind) => (
              // <Flex
              //   key={ind}
              //   w="80%"
              //   padding={"1rem"}
              //   borderRadius={"1rem"}
              //   marginInline={"auto"}
              //   h="fit-content"
              //   border="1px solid lightgray"
              //   direction={"column"}
              // >
              //   <Flex
              //     alignItems={"center"}
              //     width={"85px"}
              //     justifyContent={"space-between"}
              //   >
              //     <Image
              //       boxSize={"40px"}
              //       borderRadius={"full"}
              //       src={el.userDetails.profile}
              //     />
              //     <Text
              //       fontSize={"xl"}
              //       textAlign={"left"}
              //       fontStyle={"italic"}
              //       fontWeight={"bold"}
              //     >
              //       {el.userDetails.name}
              //     </Text>
              //   </Flex>
              //   <Text textAlign={"left"}>{el.content}</Text>
              //   {el.picture ? <Image boxSize={"280px"} src={el.picture} /> : ""}
              //   <Flex
              //     p="1rem"
              //     w="120px"
              //     justifyContent={"space-between"}
              //     alignItems={"center"}
              //     border="1px solid black"
              //   >
              //     {/* <BsBalloonHeart size={'2rem'} onClick={()=>handleLikeButton(el._id)} color={el.likes.includes(id)? "red":"black"} /> */}
              //     {el.likes.includes(id) ? (
              //       <BsFillEmojiSmileFill
              //         size={"1.7rem"}
              //         onClick={() => handleLikeButton(el._id)}
              //         color="red"
              //       />
              //     ) : (
              //       <BsFillEmojiFrownFill
              //         size={"1.7rem"}
              //         onClick={() => handleLikeButton(el._id)}
              //         color="green"
              //       />
              //     )}{el.likes.length}
              //     <BsChatDots
              //       size="1.8rem"
              //       onClick={() => {
              //         setCurrentPost(el);
              //         onOpen();
              //       }}
              //     />
              //   </Flex>

              // </Flex>
              <SinglePost postData={el} key={ind} />
            ))}
        </Box>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
      {/* <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
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

                {
                  isLoading ? <h1>Loading...</h1> : 
                  <Box>
                  {currentPost._id &&
                    currentPost.comments.map((comment) => {
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
                                  : currentPost.commentDetails.profile
                              }
                              border="1px solid black"
                              w="50px"
                              borderRadius={"50%"}
                            ></Image>
                            <Text>
                              {comment.userId === userData._id
                                ? userData.name
                                : currentPost.commentDetails.name}
                            </Text>
                          </Flex>
                          <Text>{comment.comment}</Text>
                        </Box>
                      );
                    })}
                </Box>
                }
                
            
          </ModalBody>
        </ModalContent>
      </Modal>      */}
    </>
  );
};

export default PostBar;
