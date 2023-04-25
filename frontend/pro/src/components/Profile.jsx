import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { BsPencil } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserDetails } from '../Redux/User/User.Actions'
import { getSingleUserProfilePosts } from '../Redux/Posts/Post.action'
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

const Profile = () => {
  const {userData} = useSelector(store => store.user);
  const dispatch = useDispatch()
  const {id,token} = useSelector(store => store.auth);
  const {profilePosts} = useSelector(store => store.posts);
  useEffect(()=>{
    dispatch(getSingleUserProfilePosts(id,token))
    if(userData){
      dispatch(getSingleUserDetails(id))
    }
  },[id])
  // console.log(userData,id);
  // console.log(profilePosts,id,token);
  const handleFile = (e)=>{    
    const pic = e.target.files[0];
    const myImage = new CloudinaryImage(pic, {cloudName: 'dwkrorz1k'}).resize(fill().width(100).height(150));

    console.log(myImage);
  }
  return (
    <>
    <Sidebar/>
    <Box ml='300px' border='1px solid black' minH={'100vh'}>
    <Flex border='1px solid red' w={'80%'} m='auto' p={'1rem'}>
      <Box border='1px solid green' w='40%' padding={'1rem'}>
    <Box className='profile-div' w='200px' m='auto' backgroundPosition={'center'} backgroundSize={'contain'} backgroundImage={`url(${userData.profile})`} h='200px' borderRadius={'50%'} border='1px solid black'>

    </Box>
    <Box mt='1rem'>
      <Input type="file" onChange={(e)=>handleFile(e)} />
    <Button size='sm'>Change Pic</Button>
    <Button size='sm'>Remove Pic</Button>
    </Box>
      </Box>
    <Flex border='1px solid black' h='max-content'  ml='2rem' w='60%' direction={'column'} justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} w='full'>
    <Text>{userData ? userData.name : "Name"}</Text>
    <Button rightIcon={<BsPencil/>}>Change Name</Button>
      </Flex>
      <Flex  alignItems={'center'} justifyContent={'space-between'} w='full'>
    <Text>{userData ? userData.gender : "Not sufficient data"}</Text>
    <Button rightIcon={<BsPencil/>}>Change Bio</Button>

      </Flex>
    </Flex>
    </Flex>
    <Flex direction='column' border='1px solid black'>
      <Text as='h2'>All Posts</Text>
      {profilePosts && profilePosts.map((post,ind)=>(
        <Box key={ind} border='1px solid black' padding={'1rem'} borderRadius={'1rem'} w='fit-content' m='1rem auto'>
          {post.content}
        </Box>
      ))}
    </Flex>
    </Box>
    </>
  )
}

export default Profile