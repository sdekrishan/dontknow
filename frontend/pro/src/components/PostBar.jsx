import React, { useEffect } from "react";
import { getSingleUserPosts } from "../Redux/Posts/Post.action";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";

const PostBar = ({data}) => {
console.log(data);
  return (
    <>
      {data ? (
        <Box>
        {data.map((el,ind)=>(
          <Flex key={ind}> 
            <Text>{el.content}</Text>
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
