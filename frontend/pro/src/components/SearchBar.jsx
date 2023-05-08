import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Redux/User/User.Actions';
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { getFriendPosts } from '../Redux/Posts/Post.action';

const SearchBar = () => {
    const {searchData} = useSelector(store => store.user);
    const {id} = useSelector(store => store.auth);
    const [query, setQuery ] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token } = useSelector(store => store.auth);
    const inputRef = useRef(null)
    useEffect(()=>{
        dispatch(getAllUsers(id));
    },[]);

    const handleChange = (event) =>{
        setQuery(event.target.value);
        setTimeout(()=>{
            const searchResultArray = searchData.filter(el => el.name.includes(query));
            setSearchResult(searchResultArray)
        },1000)
    }
    const handleView =(friendId) =>{
       dispatch(getFriendPosts(friendId,token))

        navigate(`/view/${friendId}`)
    }
  return (
    <>
    <Sidebar/>
    <Box ml={{base:"0",sm:"0",md:"25vw"}} pt={{base:"4rem",sm:"4rem",md:"2rem"}}>
        <Box  w={{base:"90%",sm:"90%",md:"60%"}} marginInline={'auto'} >
    <Input placeholder='Enter People Name' value={query} onChange={(e)=>handleChange(e)}/>
        </Box>
    
    <Flex direction={'column'} marginInline='auto' w={{base:"90%",sm:"90%",md:"60%"}}  mt='1rem' alignItems={'center'}>
        {searchResult && searchResult.map((el,ind)=>{
            return <Flex key={ind} borderBottom='3px solid lightgrey' w='full'  padding={'1rem'} borderRadius={"1rem"} marginInline={'auto'} justifyContent={'space-between'} >
                <Flex alignItems={'center'} justifyContent={'space-between'} gap='1rem'>
                    <Image src={el.profile} w='40px'/>
                <Text className='text'>
                {el.name}
                </Text>
                </Flex>
                <Button colorScheme='orange' onClick={()=> handleView(el._id)}>View</Button>
            </Flex>
        })}
    </Flex>
    </Box>
    </>
  )
}

export default SearchBar