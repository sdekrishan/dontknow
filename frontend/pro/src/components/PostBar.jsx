import { Box, Button, Flex,  Image,  Input,  Modal,  ModalBody,  ModalCloseButton,  ModalContent,  ModalFooter,  ModalHeader,  ModalOverlay,  SkeletonCircle, SkeletonText, Text, useDisclosure, useStatStyles } from "@chakra-ui/react";
import { BsBalloonHeart, BsChatDots, BsEmojiKiss } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addCommentFun, likeFunction } from "../Redux/Posts/Post.action";
import {AiOutlineSend} from 'react-icons/ai'
import { useState } from "react";

const PostBar = ({data,loading}) => {
const { isOpen, onOpen, onClose } = useDisclosure();
const [comment, setComment ] = useState("")
const {id,token } = useSelector(store=> store.auth);
const {posts} = useSelector(store => store.posts)
const dispatch = useDispatch()
  const handleLikeButton = (postId) =>{
    dispatch(likeFunction(id,postId,token))
  }

  //for setting the comment 
  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleSendComment = (postId) =>{
    const commentData = {comment,userId:id}
    dispatch(addCommentFun(postId,commentData,token))
  }
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
console.log('posts',posts);
  return (
    <>
    <Text fontSize={'3xl'}>PostBar</Text>
      {data ? (
        <Box >
        {posts.length > 0 && posts?.map((el,ind)=>(
          <Flex key={ind} w='80%' padding={'1rem'} borderRadius={'1rem'} marginInline={'auto'} h='fit-content' border='1px solid lightgray' direction={'column'}> 
          <Flex alignItems={'center'} width={'85px'} justifyContent={'space-between'}>
          <Image boxSize={'40px'} borderRadius={'full'} src={el.userDetails.profile}/>
          <Text fontSize={'xl'} textAlign={'left'} fontStyle={'italic'} fontWeight={'bold'}>{el.userDetails.name}</Text>
          </Flex>
            <Text textAlign={'left'}>{el.content}</Text>
            {el.picture ? <Image boxSize={'280px'} src={el.picture} /> : ""}
            <Flex border='1px solid black' p='1rem' w='120px' justifyContent={'space-between'} >              {/* <Button colorScheme="red">Like</Button>
               */}
               <BsBalloonHeart size={'2rem'} onClick={()=>handleLikeButton(el._id)} color={el.likes.includes(id)? "red":"black"} />
               <BsChatDots size='1.8rem' onClick={()=>onOpen()} />
              {/* <Button colorScheme="green">Comment</Button> */}
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex border='1px solid black' justifyContent={'space-between'} alignItems={'center'}>
            <Input name='comment' type='text' w='90%' onChange={(e)=> handleComment(e)}/>
            <AiOutlineSend size={'6%'} onClick={()=> handleSendComment(el._id)} />
            </Flex>
            <Box>
               {el.comments.map((comment)=>{
                return <Box key={comment._id}>
                  <Flex>
                  <Image src={el.commentDetails.profile} border='1px solid black' w='50px' borderRadius={'50%'}></Image>
                  <Text>{el.commentDetails.name}</Text>
                  </Flex>
                  <Text>{comment.comment}</Text>
                </Box>
               })}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
          </Flex>
            
        ))}  

         </Box>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
      
    </>
  );
};

export default PostBar;
