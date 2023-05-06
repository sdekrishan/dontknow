import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({userMsg,check}) => {
    
  return (
    <Flex justifyContent={check ? 'flex-end' : 'flex-start'} alignItems={check ? 'flex-end' : 'flex-start'} >
        <Box w='fit-content' bgColor={check? 'lightgreen' : 'lightblue'} borderRadius={'1rem'} borderBottomLeftRadius={check ? '1rem' : 'none' } borderBottomRightRadius={!check ? '1rem' : 'none' } marginBlock={'.5rem'}  p='.6rem' border='1px solid black'>
        <Text >{userMsg}</Text>
        </Box>
    </Flex>
     
  )
}

export default Message