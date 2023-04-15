import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Sidebar from './Sidebar'
import { BsPencil } from 'react-icons/bs'

const Profile = () => {
  return (
    <>
    <Sidebar/>
    <Box ml='300px' border='1px solid black' minH={'100vh'}>
    <Flex border='1px solid red' w={'80%'} m='auto' p={'1rem'}>
      <Box border='1px solid black' w='40%' >
    <Box className='profile-div' w='200px' m='auto' h='200px' borderRadius={'50%'} border='1px solid black'>

    </Box>
    <Box m='1rem auto'>
    <Button size='sm'>Change Pic</Button>
    <Button size='sm'>Remove Pic</Button>
    </Box>
      </Box>
    <Flex border='1px solid black' h='max-content'  ml='2rem' w='66%' direction={'column'} justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} w='full'>
    <Text>Name</Text>
    <Button rightIcon={<BsPencil/>}>Change Name</Button>
      </Flex>
      <Flex  alignItems={'center'} justifyContent={'space-between'} w='full'>
    <Text>description</Text>
    <Button rightIcon={<BsPencil/>}>Change Bio</Button>

      </Flex>
    </Flex>
    </Flex>
    <Flex direction='column' border='1px solid black'>
      
    </Flex>
    </Box>
    </>
  )
}

export default Profile