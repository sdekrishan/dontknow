import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "./Styles/Postbar.scss";
import SinglePost from "./SubComponents/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleUserPosts } from "../Redux/Posts/Post.action";

const PostBar = () => {
  const {posts } = useSelector(store => store.posts)
  const {id,token} = useSelector(store => store.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getSingleUserPosts(id,token))
},[])  
  return (
    <>
      {posts ? (
        <div className="postbar_container">
          {posts.length > 0 &&
            posts?.map((el, ind) => <SinglePost postData={el} key={ind} />)}
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
