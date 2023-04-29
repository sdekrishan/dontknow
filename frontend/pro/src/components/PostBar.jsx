import { Box, Button, Flex,  Image,  SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {AiOutlineHeart } from 'react-icons/ai'
const PostBar = ({data,loading}) => {
  
const {userDetails} = useSelector(store=> store.posts)
console.log('data',data);
if(loading){
  return <>
    <Text fontSize={'3xl'}>PostBar</Text>
  <Box padding="6" boxShadow="lg" bg="white">
  <SkeletonCircle size="10" />
  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
</Box>
<Box padding="6" boxShadow="lg" bg="white">
  <SkeletonCircle size="10" />
  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
</Box>
<Box padding="6" boxShadow="lg" bg="white">
  <SkeletonCircle size="10" />
  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
</Box>
<Box padding="6" boxShadow="lg" bg="white">
  <SkeletonCircle size="10" />
  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
</Box>
<Box padding="6" boxShadow="lg" bg="white">
  <SkeletonCircle size="10" />
  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
</Box>
  </>
}
console.log('data',data);
  return (
    <>
    <Text fontSize={'3xl'}>PostBar</Text>
      {data ? (
        <Box >
        {data.length > 0 && data?.map((el,ind)=>(
          <Flex key={ind} w='80%' padding={'1rem'} borderRadius={'1rem'} marginInline={'auto'} h='fit-content' border='1px solid lightgray' direction={'column'}> 
          <Flex alignItems={'center'} width={'85px'} justifyContent={'space-between'}>
          <Image boxSize={'40px'} borderRadius={'full'} src={el.userDetails.profile}/>
          <Text fontSize={'xl'} textAlign={'left'} fontStyle={'italic'} fontWeight={'bold'}>{el.userDetails.name}</Text>
          </Flex>
            <Text textAlign={'left'}>{el.content}</Text>
            {el.picture ? <Image boxSize={'280px'} src={el.picture} /> : ""}
            <Flex>
              {/* <Button colorScheme="red">Like</Button>
               */}
               <AiOutlineHeart/>
              <Button colorScheme="green">Comment</Button>
            </Flex>
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
