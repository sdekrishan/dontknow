import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillChatHeartFill, BsPeople, BsSearch } from "react-icons/bs";
import { BiHomeAlt, BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

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
  const [active, setActive] = useState("Home");
  console.log(active);
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"flex-start"}>
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
              onClick={()=>setActive(el.name)}
              justifyContent={"flex-start"}
              alignItems="center"
              mb={'1rem'}   
              cursor='pointer'
              bg={active === el.name ? "black" : "none"}
              // bgColor={'black'}
              color={active===el.name ? "white":"black"}
            >
              <Box mr='1rem' >{el.icon}</Box>
              <Text fontSize={'lg'}>{el.name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default Sidebar;
