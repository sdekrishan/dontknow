import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "./Styles/Postbar.scss";
import SinglePost from "./SinglePost";

const PostBar = ({ data, loading }) => {
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
  return (
    <>
      {data ? (
        <div className="postbar_container">
          {data.length > 0 &&
            data?.map((el, ind) => (
              <SinglePost postData={el} key={ind} />
            ))}
        </div>
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
