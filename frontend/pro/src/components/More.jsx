import { Box, Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import Sidebar from './Sidebar'

const More = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
    <Sidebar/>
    <Box ml='25vw'>
      <Button onClick={toggleColorMode} colorScheme={colorMode==='dark' ?'orange' :"blackAlpha"} >
        {colorMode === 'light' ? "Dark" : "Light"}</Button>
    </Box>
    </>
  )
}

export default More