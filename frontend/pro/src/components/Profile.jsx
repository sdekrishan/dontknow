import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import "./Styles/Profile.scss";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeDpFun, getSingleUserDetails } from "../Redux/User/User.Actions";
import {
  deletePost,
  getSingleUserProfilePosts,
} from "../Redux/Posts/Post.action";
import "./Styles/Profile.css";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import ProfilePostModal from "./SubComponents/ProfilePostModal";
import ProfileRenameModal from "./SubComponents/ProfileRenameModal";
const Profile = () => {
  const [picture, setPicture] = useState(null);
  const { userData, pictureLoading } = useSelector((store) => store.user);
  const [postOpen, setPostOpen] = useState(false);
  const [renameModal, setRenameModal] = useState(false)
  const [hoverBtn, setHoverBtn] = useState("none");
  const [singlePostData, setSinglePostData] = useState(null)
  const dispatch = useDispatch();
  const { id, token } = useSelector((store) => store.auth);
  const { profilePosts } = useSelector((store) => store.posts);

  const handleOpen = () => setPostOpen(true);
  const handleClose = () => setPostOpen(false);
  const handleRenameModalOpen = () => setRenameModal(true);
  const handleRenameModalClose = () => setRenameModal(false);


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
    const formData = new FormData();
    formData.append("file", picture);
    console.log("profile formdata", formData);
    dispatch(changeDpFun(id, formData));
  };
  const deletePostFun = (postId) => {
    dispatch(deletePost(postId, token)).then((res) => {
      if (res.type === "DELETE_POST_SUCCESS") {
        dispatch(getSingleUserProfilePosts(id, token));
      }
    });
  };

  const handleViewPost = (post)=>{
    handleOpen();
    setSinglePostData(post)
  }

  
  return (
    <>
      <Sidebar />
      <div className="profile_container">
      {/* borderBottom={'1px solid lightgrey'} w={{base:"100%",sm:"100%",md:"90%"}} m="auto" p={"1rem"} justifyContent={'space-between'} */}
        <div className="">
          <Box justifyContent={'space-around'} w='35%' >
            <Box
              className="profile-div"
            >
              <Image src={userData.profile} borderRadius={'.5rem'} />
            <Box h='fit-content'>
              <Input type="file" name="img" onChange={(e) => handleFile(e)} />
              <Button
                isLoading={pictureLoading}
                colorScheme="red"
                size={'sm'}
                borderRadius={'25%'}
                onClick={updatePicture}
              >
                Edit
              </Button>
            </Box>
            </Box>
          </Box>
          <Flex
            h="max-content"
            w="60%"
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            position="relative"
            
          >
            <Text fontSize={{base:".9rem",sm:"1rem",md:"1.2rem"}} fontWeight={'500'} fontStyle={"oblique"} textAlign={'left'}>{userData ? userData.name : "Name"}, {userData ? userData.gender : "Not sufficient data"}</Text>
            <Text fontSize={{base:".8rem",sm:".9rem",md:"1.1rem"}} fontStyle={"oblique"} textAlign={'left'} fontWeight={'400'}>
              {userData.bio ? userData.bio : "Say something about yourself"}
            </Text>
            <Box
              pos={"absolute"}
              top="0"
              right={"0"}
              border="1px solid black"
              onClick={handleRenameModalOpen}
              padding={".5rem"}
              borderRadius={"50%"}
            >
              <BsPencil/>
            </Box>
          </Flex>
        </div>
        
        <ProfileRenameModal userData={userData} isOpen={renameModal} onClose={handleRenameModalClose}/>
        <Flex direction="column" >
          <Text className="bighead">Posts</Text>
          <div className="profile_post_container" >
            {profilePosts &&
              profilePosts.map((post, ind) => (
                <div
                  key={ind}
                  className="profile_post_container_box"
                  style={{backgroundImage:`url(${post.picture})`}}
                >
                  <div
                    className="container_box_subdiv"
                    onClick={() => deletePostFun(post._id)}
                  >
                    <AiOutlineDelete  />
                  </div>
                  <div
                    onClick={()=>handleViewPost(post)}
                   className="container_box_subdiv2"
                  >
                    <AiFillEye />
                  </div>

                </div>
              ))}
              <ProfilePostModal data={singlePostData} isOpen={postOpen} onClose={handleClose} />
          </div>
        </Flex>
      </div>
    </>
  );
};

export default Profile;
