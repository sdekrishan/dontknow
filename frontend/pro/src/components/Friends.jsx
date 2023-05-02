import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriendRequest, getAllUnfollowedFriends, getSingleUserDetails, sendFriendRequest} from '../Redux/User/User.Actions'
import axios from 'axios'

const Friends = () => {
  const {unfollowedPeople,userData} = useSelector(store=>store.user);
  const {id} = useSelector(store => store.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!userData.name){
      console.log("inside useEffect is working")
      dispatch(getSingleUserDetails(id))
    }
    dispatch(getAllUnfollowedFriends(id))
  },[])


  const sendFriendRequestFun = (followId) =>{
    console.log(id,followId);
    dispatch(sendFriendRequest(id,followId)).then(res => {
      if(res.type === 'FRIEND_REQUEST_SUCCESS'){
        dispatch(getAllUnfollowedFriends(id));
        dispatch(getSingleUserDetails(id));
      }else{
        console.log(res);
      }
    }).catch(err=>console.log('inside error catch',err))
  }

  const acceptFriendRequestFun = (followId) => {
    dispatch(acceptFriendRequest(id,followId)).then(res => {
      if(res.type ==='FRIEND_REQUEST_SUCCESS'){
        dispatch(getSingleUserDetails(id))
      }
    })

  }
  console.log('unfollowed people',unfollowedPeople);
  console.log('userData',userData);
  return (
    <>
    <Sidebar/>
    <Grid  ml='300px' templateColumns={'repeat(2,1fr)'} gap='1rem'>
      <Box border={'1px solid black'} className='requests'>
        <Text align='center'>Friend's Requests</Text>
        {
           userData.requests ? userData.requests.map((el,ind)=>{
            return <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
            <Text>{el.name}</Text>
            <Button colorScheme='blue' onClick={()=>acceptFriendRequestFun(el._id)} >Follow</Button>
          </Flex>
          })
          : <h1>No requests now</h1>
        }
      </Box>
      <Box border={'1px solid black'} className='not_in_your_list'>
      <Text align='center'>People you may know</Text>

        {
          unfollowedPeople.length > 0 ? unfollowedPeople.map((el,ind)=>(
            <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
              <Text>{el.name}</Text>
              <Button colorScheme='blue' onClick={()=>sendFriendRequestFun(el._id)}>Follow</Button>
            </Flex>
          ))
          : <h1>No people left to follow</h1>
        }
      </Box>
      <Box border={'1px solid black'} className='friends'>
      <Text align='center'>Your Friends</Text>

        {
          userData.friends ? userData.friends.map((el,ind)=>{
            return <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
            <Text>{el.name}</Text>
            <Button colorScheme='blue'>View</Button>
            {/* <Button colorScheme='blue'>View</Button> */}
          </Flex>
          })
          : <h1>😥 you have no friends mate</h1>
        }
      </Box>
      <Box border={'1px solid black'} className=''>
      {
          userData.sendedRequests ? userData.sendedRequests.map((el,ind)=>{
            return <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
            <Text>{el.name}</Text>
            <Button colorScheme='blue'>View</Button>
            {/* <Button colorScheme='blue'>View</Button> */}
          </Flex>
          })
          : <h1>😥 you have no friends mate</h1>
        }
      </Box>
     
    </Grid>
    </>
  )
}

export default Friends