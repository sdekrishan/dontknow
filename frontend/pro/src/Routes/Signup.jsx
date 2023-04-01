import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    email:"",
    username:"",
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
 <FormControl onSubmit={signupButton}>
              <FormLabel>UserName</FormLabel>
                <Input type="text" required name='username' onChange={handleSignupChange}/>
                <FormLabel>Email address</FormLabel>
                <Input type="email" required name='email' onChange={handleSignupChange} />
                <FormLabel>Password</FormLabel>
                <Input type="password" required name = 'password' onChange={handleSignupChange} />
                <Input type="submit"  color="white" bgColor={"green.500"} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
    </>
  )
}

export default Signup