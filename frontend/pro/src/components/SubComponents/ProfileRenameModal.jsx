import { Button, FormControl, FormHelperText, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { updateUserFun } from '../../Redux/User/User.Actions'
import { useDispatch, useSelector } from 'react-redux'

const ProfileRenameModal = ({userData,isOpen,onClose}) => {
const{id} = useSelector(store => store.auth);
const dispatch = useDispatch()
const [form,setForm] = useState({
    name:`${userData && userData.name !== undefined ? userData.name : ''}`,
    bio:`${userData && userData.bio !== undefined ? userData.bio : ''}`,
    gender:`${userData && userData.gender !== undefined ? userData.gender : 'male'}`
  })
    const handleRadio = (event)=>{
        setForm({...form,gender:event})
      }
    
      const handleFormChange = (event) => {
        const {value,name} = event.target;
        console.log(event);
        setForm({...form ,[name]:value})
      }
      const handleSubmitForm = (e)=>{
        e.preventDefault();
        dispatch(updateUserFun(id,form))
        console.log('form',form);
      }
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl >
                <FormLabel>Name</FormLabel>
                <Input type="text" defaultValue={userData.name} name='name' onChange={handleFormChange} />
                <FormLabel>Gender</FormLabel>
                <RadioGroup defaultValue={`${userData.gender}`} name="gender" onChange={handleRadio}>
                  <HStack    spacing="24px">
                    <Radio value="male">Men</Radio>
                    <Radio value="female">Women</Radio>
                    <Radio value="prefer not to say">Prefer Not to Say</Radio>
                  </HStack>
                </RadioGroup>
                <FormLabel>Bio</FormLabel>
                <Textarea defaultValue={userData.bio} type="text" name='bio' onChange={handleFormChange} />
                <FormHelperText>Be Creative !</FormHelperText>
              
              
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={handleSubmitForm}>Update It !</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  )
}

export default ProfileRenameModal