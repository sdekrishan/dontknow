import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {followPeopleFun, getAllUnfollowedFriends} from '../Redux/User/User.Actions'
const Friends = () => {
  const {unfollowedPeople} = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const {id} = useSelector(store => store.auth)
  useEffect(()=>{
    dispatch(getAllUnfollowedFriends(id))
  },[])

  const sendFriendRequest = (friendId) =>{
    console.log(friendId,'friend id in react');
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
  return (
    <>
    <Sidebar/>
    <Box ml='300px'>
    {
      unfollowedPeople && unfollowedPeople.map((el,ind)=>{
        return <Flex key={el._id} alignItems={'center'} w='full' justifyContent={'space-between'}>
          <Text>{el.name}</Text>
          <Button onClick={()=>sendFriendRequest(el._id)} colorScheme='facebook'>Follow</Button>
          </Flex>
      })
    }
    </Box>
    </>
  )
}

export default Friends