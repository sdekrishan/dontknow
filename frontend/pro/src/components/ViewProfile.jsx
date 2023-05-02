import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendProfile } from '../Redux/User/User.Actions'
import { getFriendPosts } from '../Redux/Posts/Post.action'

const ViewProfile = () => {
    const {id} = useParams()
    const {friendProfile} = useSelector(store => store.user);
    const {token} = useSelector(store => store.auth)
    const {friendPosts} = useSelector(store => store.posts)
    const dispatch = useDispatch()
    console.log(id,friendPosts);
    useEffect(()=>{
       dispatch(getFriendProfile(id))
       dispatch(getFriendPosts(id,token))
    },[])
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
              backgroundImage={`url(${friendProfile.profile})`}
              h="200px"
              borderRadius={"50%"}
              objectFit={"fill"}
              border="1px solid lightgray"
            ></Box>
            
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
              <Text>{friendProfile ? friendProfile.name : "Name"}</Text>
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w="full"
            >
              <Text>{friendProfile ? friendProfile.gender : "Not sufficient data"}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" border="1px solid black">
          <Text as="h2">All Posts</Text>
          {friendPosts &&
            friendPosts.map((post, ind) => (
              <Box
                key={ind}
                border="1px solid black"
                padding={"1rem"}
                borderRadius={"1rem"}
                w="fit-content"
                m="1rem auto"
              >
                {post.content}
              </Box>
            ))}
        </Flex>
      </Box>
    </>
  )
}

export default ViewProfile