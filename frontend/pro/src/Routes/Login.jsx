import React, { useState } from "react";
import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Center,
  Box,
  FormHelperText,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import './Styles/Login.css'
const Login = () => {
  const [signupForm, setSignupForm] = useState({
    email:"",
    username:"",
    password:""
  })

  const [loginForm, setLoginForm] = useState({
    email:"",
    password:""
  })

  const handleSignupChange = (e) =>{
    const {name,value} = e.target
    setSignupForm({[name]:value})
  }
  const signupButton = () =>{
    console.log(signupForm);
  }
  return (
    <>
      <Box
        w="50%"
        border="1px solid black"
        margin={"5rem auto"}
        padding="1rem"
        borderRadius={"1rem"}
      >
        <Tabs colorScheme={"orange"} size="lg" variant={"soft-rounded"}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
          </TabList>
          <TabPanels bgColor={'black'} color='white' className="tabpanels">
            <TabPanel>

              {/* Login Form */}

              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" required />
                <FormLabel>Password</FormLabel>
                <Input type="password" required />
                <Input type="submit" color="white" bgColor={"green.500"} />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
            </TabPanel>
            <TabPanel>

              {/* Signup Form */}

              <FormControl onSubmit={signupButton}>
              <FormLabel>UserName</FormLabel>
                <Input type="text" required name='username' onChange={handleSignupChange} />
                <FormLabel>Email address</FormLabel>
                <Input type="email" required name='email' onChange={handleSignupChange}/>
                <FormLabel>Password</FormLabel>
                <Input type="password" required name = 'password' onChange={handleSignupChange} />
                <Input type="submit"  color="white" bgColor={"green.500"} />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Login;
