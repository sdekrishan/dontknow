import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillChatHeartFill, BsPeople, BsSearch } from "react-icons/bs";
import { BiHomeAlt, BiMenu } from "react-icons/bi";
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
  },
];

const Sidebar = () => {
  const location = useLocation();

  const [active, setActive] = useState(location.pathname);
  const navigate = useNavigate()
  const handleClick = (el)=>{
    setActive(el.name);
    navigate(`${el.route}`)
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
      </Flex>
    </div>
  );
};

export default Sidebar;
