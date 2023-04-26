import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import {BsPlusSquare, BsFillChatHeartFill, BsPeople, BsSearch } from "react-icons/bs";
import { BiHomeAlt, BiMenu } from "react-icons/bi";
import {GrAttachment} from 'react-icons/gr';
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/Sidebar.css"
const linkbar = [
  {
    name: "Home",
    route: "/home",
    icon: <BiHomeAlt />,
  },
  {
    name: "Search",
    route: "/search",
    icon: <BsSearch />,
  },
  {
    name: "Friends",
    route: "/friends",
    icon: <BsPeople />,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: <CgProfile />,
  },
  {
    name: "More",
    route: "/more",
    icon: <BiMenu />,
  }
];

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState(location.pathname);
  const navigate = useNavigate()
  const handleClick = (el)=>{
    setActive(el.name);
    navigate(`${el.route}`);
  }
  const handleCreatePost = () =>{
    setActive('Create Post')
    onOpen()
  }
  return (
    <div className="sidebar">
      <Flex alignItems={"center"} justifyContent={"flex-start"} >
        <Text fontSize={"2xl"} fontStyle={"italic"} textAlign={"left"} marginInline='1rem'>
          Les'alk
        </Text>
        <BsFillChatHeartFill size={"25px"} color="red" />
      </Flex>
      <Flex direction={"column"}  padding='1rem '>
        {linkbar.map((el, ind) => {
          return (
            <Flex
              key={ind}
              onClick={()=>handleClick(el)}
              justifyContent={"flex-start"}
              alignItems="center"
              mb={'1rem'}   
              cursor='pointer'
              p='.5rem 1rem'
              borderRadius={'1rem'}
              bg={active === el.route ? "black" : "none"}
              color={active===el.route ? "white":"black"}
            >
              <Box mr='1rem' >{el.icon}</Box>
              <Text fontSize={'lg'}>{el.name}</Text>
            </Flex>
          );
        })}
        <Box 
        display={'flex'}
         justifyContent={"flex-start"}
         alignItems="center"
         mb={'1rem'}   
         cursor='pointer'
         p='.5rem 1rem'
         borderRadius={'1rem'}
         onClick={handleCreatePost}
         bg={ active === 'Create Post' ? "black" : 'white'}
         color={active === 'Create Post' ? "white" : 'black'} 
         >
              <Box mr='1rem' ><BsPlusSquare/></Box>
              <Text fontSize={'lg'}>Create Post</Text>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <Textarea placeholder={'Write Something about your post'}/>
            <Box border='1px solid lightgray' padding={'10px'} w='fit-content' borderRadius={'5px'}> 
        <GrAttachment/>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="whatsapp">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sidebar;
