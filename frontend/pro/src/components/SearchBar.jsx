import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Redux/User/User.Actions';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
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
    const {token } = useSelector(store => store.auth)
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
    <Box ml='300px'>
    <Input placeholder='Enter People Name' w='60%' marginInline={'auto'} value={query} onChange={(e)=>handleChange(e)}/>
    {/* <Button></Button> */}
    
    <Flex direction={'column'} >
        {searchResult && searchResult.map((el,ind)=>{
            return <Flex key={ind} border='1px solid black' padding={'1rem'} borderRadius={"1rem"} w='full' justifyContent={'space-around'}>
                <Text>
                {el.name}
                </Text>
                <Button colorScheme='orange' onClick={()=> handleView(el._id)}>View</Button>
            </Flex>
        })}
    </Flex>
    </Box>
    </>
  )
}

export default SearchBar