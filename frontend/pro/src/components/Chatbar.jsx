import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux'

const Chatbar = () => {
  const {userData} = useSelector(store => store.user);
  console.log('userData',userData);
  const handleChatClick  =()=>{

  }
  return (
    <>
    <Text as={'h1'}>ChatBar</Text>
    <Box>
      {
        userData.friends && userData.friends.map((friend,ind)=>(
          <Flex justifyContent={'space-around'} border='1px solid black' key={`${friend._id}`} onClick={handleChatClick}>
            <Image src={friend.profile} w='30px' h='30px' borderRadius={'50%'} border={'1px solid black'} />
            <Text>{friend.name}</Text>
          </Flex>
        ))
      }
    </Box>
    </>
  )
}

export default Chatbar