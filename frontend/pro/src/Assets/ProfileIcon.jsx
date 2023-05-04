import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserDetails } from '../Redux/User/User.Actions';

const ProfileIcon = () => {
    const {id} = useSelector(store => store.auth);
    const {userData } = useSelector(store => store.user);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSingleUserDetails(id))
    },[])
    console.log(userData,'userData');
  return (
    <Image src={`${userData.profile}`} w={'25px'} h={'25px'} borderRadius={'50%'}/>
  )
}

export default ProfileIcon