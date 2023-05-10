import React, { useEffect, useState } from "react";
import "./Styles/Profile.scss";
import { Button, useToast } from '@chakra-ui/react'
import Sidebar from "./Sidebar";
import { BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeDpFun, getSingleUserDetails } from "../Redux/User/User.Actions";
import {
  deletePost,
  getSingleUserProfilePosts,
} from "../Redux/Posts/Post.action";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import ProfilePostModal from "./SubComponents/ProfilePostModal";
import ProfileRenameModal from "./SubComponents/ProfileRenameModal";
const Profile = () => {
  const [picture, setPicture] = useState(null);
  const { userData, pictureLoading } = useSelector((store) => store.user);
  const [renameModal, setRenameModal] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [singlePostData, setSinglePostData] = useState(null);
  const dispatch = useDispatch();
  const { id, token } = useSelector((store) => store.auth);
  const { profilePosts } = useSelector((store) => store.posts);
  const toast = useToast();

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
    if(!picture){
      return toast({
        title: 'Invalid Image.',
        description: "Please Choose a Valid Image.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }else{
      dispatch(changeDpFun(id, formData));
      return toast({
        title: 'Image Updated.',
        description: "Image has been successfully updated.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  };


  const deletePostFun = (postId) => {
    dispatch(deletePost(postId, token)).then((res) => {
      if (res.type === "DELETE_POST_SUCCESS") {
        dispatch(getSingleUserProfilePosts(id, token));
      }
    });
  };

  const handleViewPost = (post) => {
    handleOpen();
    setSinglePostData(post);
  };

  return (
    <>
      <Sidebar />
      <div className="profile_container">
        <div className="profile_container_subdiv">
          <div style={{ width: "35%" }}>
            <div className="profile-div" style={{ overflow: "hidden" }}>
              <img
                src={userData.profile}
                className="container_subdiv_img"
                alt={userData.name}
              />
              <div className="container_subdiv_inputdiv">
                <input type="file" name="img" onChange={(e) => handleFile(e)} />
                <Button
                colorScheme="red"
                  isLoading={pictureLoading}
                  className="container_subdiv_btn"
                  onClick={updatePicture}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <div className="profile_bio_container">
            <div>
              <h1 className="profile_bio_name">
                {userData ? userData.name : "Name"},{" "}
                {userData ? userData.gender : "Not sufficient data"}
              </h1>
              <h1 className="profile_bio_bio">
                {userData.bio ? userData.bio : "Say something about yourself"}
              </h1>
            </div>
            <div onClick={handleRenameModalOpen} className="profile_bio_edit">
              <BsPencil />
            </div>
          </div>
        </div>

        <ProfileRenameModal
          userData={userData}
          isOpen={renameModal}
          onClose={handleRenameModalClose}
        />
        <div>
          <h1 className="bighead">Posts</h1>
          <div className="profile_post_container">
            {profilePosts &&
              profilePosts.map((post, ind) => (
                <div
                  key={ind}
                  className="profile_post_container_box"
                  style={{ backgroundImage: `url(${post.picture})` }}
                >
                  <div
                    className="container_box_subdiv"
                    onClick={() => deletePostFun(post._id)}
                  >
                    <AiOutlineDelete />
                  </div>
                  <div
                    onClick={() => handleViewPost(post)}
                    className="container_box_subdiv2"
                  >
                    <AiFillEye />
                  </div>
                </div>
              ))}
            <ProfilePostModal
              data={singlePostData}
              isOpen={postOpen}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
