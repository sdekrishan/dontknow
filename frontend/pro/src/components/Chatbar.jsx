import { Box, Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUnfollowedFriends, getSingleUserDetails, sendFriendRequest } from '../Redux/User/User.Actions';

const Chatbar = () => {
  const {userData,unfollowedPeople} = useSelector(store => store.user);
  const { id } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  console.log('userData',userData);
  
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
  return (
    <>
    <Text as={'h1'}>ChatBar</Text>
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
    </>
  )
}

export default Chatbar