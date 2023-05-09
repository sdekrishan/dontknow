import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendProfile } from '../Redux/User/User.Actions'
import { getFriendPosts } from '../Redux/Posts/Post.action'
import { AiFillEye } from 'react-icons/ai'
import ProfilePostModal from './SubComponents/ProfilePostModal'

const ViewProfile = () => {
    const {id} = useParams()
    const {friendProfile} = useSelector(store => store.user);
    const {token} = useSelector(store => store.auth)
    const {friendPosts} = useSelector(store => store.posts)
    const dispatch = useDispatch();
    const [postOpen, setPostOpen] = useState(false);
    const [singlePostData, setSinglePostData] = useState(null);
    
    useEffect(()=>{
       dispatch(getFriendProfile(id))
       dispatch(getFriendPosts(id,token))
    },[]);

    const handleViewPost = (post) => {
      handleOpen()
      setSinglePostData(post);
      
    };
    const handleClose = () => setPostOpen(false);
    const handleOpen = () => setPostOpen(true)
  return (
    <>
    <Sidebar />
    <div className="profile_container">
        <div className="profile_container_subdiv">
          <div style={{ width: "35%" }}>
            <div className="profile-div" style={{ overflow: "hidden" }}>
              <img
                src={friendProfile.profile}
                style={{ borderRadius: ".5rem" }}
                alt={friendProfile.name}
              />
              
            </div>
          </div>

          <div className="profile_bio_container">
            <div>
              <h1 className="profile_bio_name">
                {friendProfile ? friendProfile.name : "Name"},{" "}
                {friendProfile ? friendProfile.gender : "Not sufficient data"}
              </h1>
              <h1 className="profile_bio_bio">
                {friendProfile.bio ? friendProfile.bio : "Say something about yourself"}
              </h1>
            </div>
            
          </div>
        </div>

        <div>
          <h1 className="bighead">Posts</h1>
          <div className="profile_post_container">
            {friendPosts &&
              friendPosts.map((post, ind) => (
                <div
                  key={ind}
                  className="profile_post_container_box"
                  style={{ backgroundImage: `url(${post.picture})` }}
                  onClick={() => handleViewPost(post)}
                >
                  
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
  )
}

export default ViewProfile