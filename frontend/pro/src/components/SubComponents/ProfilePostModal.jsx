import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
import SinglePost from './SinglePost';

const ProfilePostModal = ({data,isOpen, onClose}) => {

    console.log(data);
  return (
    <Modal isOpen={isOpen}  onClose={onClose} >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader></ModalHeader>
      <ModalCloseButton  />
      <ModalBody>
        <SinglePost postData={data}/>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ProfilePostModal