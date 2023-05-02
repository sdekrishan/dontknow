import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeDpFun, getSingleUserDetails } from "../Redux/User/User.Actions";
import { getSingleUserProfilePosts } from "../Redux/Posts/Post.action";
import "./Styles/Profile.css"
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const [picture, setPicture] = useState(null);
  const { userData,pictureLoading } = useSelector((store) => store.user);
  const [hoverBtn, setHoverBtn] = useState("none")
  const dispatch = useDispatch();
  const { id, token } = useSelector((store) => store.auth);
  const { profilePosts } = useSelector((store) => store.posts);

  console.log('profileposts',profilePosts);
  useEffect(() => {
    dispatch(getSingleUserProfilePosts(id, token));
    if (userData) {
      dispatch(getSingleUserDetails(id));
    }
  }, []);

  const handleFile = (e) => {
    setPicture(e.target.files[0]);
  };
  const updatePicture = () => {
    // setPictureLoading(true);
    const formData = new FormData();
    formData.append("file", picture);
    console.log('profile formdata',formData);
    dispatch(changeDpFun(id, formData));
    // setPictureLoading(false);
  };
  const bstyle = {

  }
  return (
  <>
      <Sidebar />
      <Box ml="300px" border="1px solid black" minH={"100vh"}>
        <Flex border="1px solid red" w={"80%"} m="auto" p={"1rem"}>
          <Box border="1px solid green" w="40%" padding={"1rem"}>
            <Box
              className="profile-div"
              w="200px"
              m="auto"
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
              backgroundImage={`url(${userData.profile})`}
              h="200px"
              borderRadius={"50%"}
              objectFit={"fill"}
              border="1px solid lightgray"
            ></Box>
            <Box mt="1rem">
              <Input type="file" name="img" onChange={(e) => handleFile(e)} />
              <Button
                isLoading={pictureLoading}
                colorScheme="red"
                onClick={updatePicture}
                size="sm"
              >
                Change Pic
              </Button>
              <Button size="sm">Remove Pic</Button>
            </Box>
          </Box>
          <Flex
            border="1px solid black"
            h="max-content"
            ml="2rem"
            w="60%"
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w="full"
            >
              <Text>{userData ? userData.name : "Name"}</Text>
              <Button rightIcon={<BsPencil />}>Change Name</Button>
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w="full"
            >
              <Text>{userData ? userData.gender : "Not sufficient data"}</Text>
              <Button rightIcon={<BsPencil />}>Change Bio</Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" border="1px solid black">
          <Text as="h2">All Posts</Text>
          <Grid templateColumns={'repeat(3,1fr)'} p='1rem' gap='1rem'>
          {profilePosts &&
            profilePosts.map((post, ind) => (
              <Box
              key={ind}
              border="1px solid black"
              padding={"1rem"}
              borderRadius={"1rem"}
              w="full"
              m="1rem auto"
              bgImage={`url(${post.picture})`}
              height={'200px'}
              className="post-card"              
              >
                <Box display={hoverBtn} bgColor={'white'} p='1rem' borderRadius={'50%'} w='fit-content' className="del_btn">
                  <AiOutlineDelete/>
                </Box>
              </Box>
            ))}
            </Grid>
        </Flex>
      </Box>
    </>
  );
};

export default Profile;
