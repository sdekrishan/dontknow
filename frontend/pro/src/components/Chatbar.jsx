import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUnfollowedFriends, getSingleUserDetails, sendFriendRequest } from '../Redux/User/User.Actions';
import './Styles/Chatbar.scss';
const Chatbar = () => {
  const {unfollowedPeople} = useSelector(store => store.user);
  const { id } = useSelector(store => store.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUnfollowedFriends(id))
  },[])
  
  const sendFriendRequestFun = (followId) =>{
    dispatch(sendFriendRequest(id,followId)).then(res => {
      if(res.type === 'FRIEND_REQUEST_SUCCESS'){
        dispatch(getAllUnfollowedFriends(id));
        dispatch(getSingleUserDetails(id));
      }else{
        console.log(res);
      }
    }).catch(err=>console.log('inside error catch',err))
  }


  return (
    <>
    <div className='chatbar_container'>
      <h1 className='heading'>People you may know</h1>

        {
          unfollowedPeople.length > 0 ? unfollowedPeople.map((el,ind)=>(
            <div className='chatbar_friend_box' key={ind}>
              <div className='chatbar_friend_subbox'>
                <img width={'40px'} src={el.profile} alt={el.name}  />
                <h3>{el.name}</h3>
              </div>
              <button className='chatbar_friend_button' onClick={()=>sendFriendRequestFun(el._id)}>Follow</button>
            </div>
          ))
          : <h1 className='bighead'>No people left to follow</h1>
        }
      </div>
    </>
  )
}

export default Chatbar