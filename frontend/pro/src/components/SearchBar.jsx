import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Redux/User/User.Actions';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const SearchBar = () => {
    const {searchData} = useSelector(store => store.user);
    const [query, setQuery ] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUsers());
    },[]);

    const handleChange = (event) =>{
        setQuery(event.target.value);
        setTimeout(()=>{
            const searchResultArray = searchData.filter(el => el.name.includes(query));
            setSearchResult(searchResultArray)
        },1000)
    }
  return (
    <>
    <Flex>
    <Input placeholder='Enter People Name' value={query} onChange={(e)=>handleChange(e)}/>
    {/* <Button></Button> */}
    </Flex>
    <Flex direction={'column'}>
        {searchResult && searchResult.map((el,ind)=>{
            return <Text key={ind}>
                {el.name}
            </Text>
        })}
    </Flex>
    </>
  )
}

export default SearchBar