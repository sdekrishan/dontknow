import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Redux/User/User.Actions'

const Friends = () => {
  const {searchData} = useSelector(store=>store.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(searchData.length === 0){
      dispatch(getAllUsers())
    }
  },[searchData.length,dispatch])
  return (
    <>
    <Sidebar/>
    <Box ml='300px'>
    {
      searchData && searchData.map((el,ind)=>{
        return <Box key={ind}>
          </Box>
      })
    }
    </Box>
    </>
  )
}

export default Friends