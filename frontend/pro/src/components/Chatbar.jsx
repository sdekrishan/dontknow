import { Box, Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUnfollowedFriends, getSingleUserDetails, sendFriendRequest } from '../Redux/User/User.Actions';
import './Styles/Chatbar.scss';
const Chatbar = () => {
  const {unfollowedPeople} = useSelector(store => store.user);
  const { id } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  
  const sendFriendRequestFun = (followId) =>{
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
    <div className='chatbar_container'>
      <h1 className='chatbar_head'>People you may know</h1>

        {
          unfollowedPeople.length > 0 ? unfollowedPeople.map((el,ind)=>(
            <div className='chatbar_friend_box' key={ind}>
              <h3>{el.name}</h3>
              <button onClick={()=>sendFriendRequestFun(el._id)}>Follow</button>
            </div>
          ))
          : <h1 className='bighead'>No people left to follow</h1>
        }
      </div>
    </>
  )
}

export default Chatbar