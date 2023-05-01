import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {followPeopleFun, getAllUnfollowedFriends} from '../Redux/User/User.Actions'
const Friends = () => {
  const {unfollowedPeople,userData} = useSelector(store=>store.user);
  const [requestArr, setRequestArr] = useState(userData.requests);
  const [friendsArr, setFriendsArr] = useState(userData.friends);
  
  const dispatch = useDispatch();
  const {id} = useSelector(store => store.auth)
  useEffect(()=>{
    dispatch(getAllUnfollowedFriends(id))
  },[])
// console.log(unfollowedPeople);
  const sendFriendRequest = (friendId) =>{
    // console.log(friendId,'friend id in react');
    dispatch(followPeopleFun(id,friendId)).then(res => {
      if(res.type === 'ADD_FRIEND_SUCCESS'){
        console.log('working',res.payload);
        console.log(unfollowedPeople);
        dispatch(getAllUnfollowedFriends(id))
      }else{
        console.log(res);
      }
    }).catch(err=>console.log(err))
  }
  console.log('request arr',requestArr);
  return (
    <>
    <Sidebar/>
    <Grid  ml='300px' templateColumns={'repeat(2,1fr)'} gap='1rem'>
      <Box border={'1px solid black'} className='requests'>
        {
          requestArr.length > 0 ? requestArr.map((el,ind)=>{
            return <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
            <Text>{el.name}</Text>
            <Button colorScheme='blue'>Follow</Button>
          </Flex>
          })
          : <h1>No requests now</h1>
        }
      </Box>
      <Box border={'1px solid black'} className='not_in_your_list'>
        {
          unfollowedPeople && unfollowedPeople.map((el,ind)=>(
            <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
              <Text>{el.name}</Text>
              <Button colorScheme='blue'>Follow</Button>
            </Flex>
          ))
        }
      </Box>
      <Box border={'1px solid black'} className='friends'>
        {
          friendsArr && friendsArr.map((el,ind)=>{
            return <Flex padding={'.4rem'} key={ind} justifyContent={'space-between'} alignItems={'center'} border='1px solid black'>
            <Text>{el.name}</Text>
            <Button colorScheme='blue'>View</Button>
            {/* <Button colorScheme='blue'>View</Button> */}
          </Flex>
          })
        }
      </Box>
      <Box border={'1px solid black'} className=''></Box>
    
    </Grid>
    </>
  )
}

export default Friends