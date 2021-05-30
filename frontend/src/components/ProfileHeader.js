import React, { useState } from 'react'
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import Button from './common/Button';
import UserPP from './common/UserPP';
import { useDispatch } from 'react-redux';
import { userFollow } from './../features/userSlice';
import { getUserId } from './../utils/Common';

const ProfileHeader = ({user, following}) => {
  const dispatch = useDispatch();
  
  const [follow, setFollow] = useState(user.following);

  const handleFollow = () => {
    dispatch(userFollow({
      followingId: user.id
    })).then((res) => {
      if (!res.payload.error) {
        setFollow(!follow);
      }
    })
  }

  return (
    <div className="p-6 bg-white shadow-sm rounded-2xl flex justify-between">
      <div className="flex">
        <UserPP temp={user.username} size={36} />
        <div className="ml-6">
          <h1 className="font-semibold text-3xl">{user.username}</h1>
          <p className="font-semibold text-helper text-base">{user.email}</p>
          <p className="mt-4 font-semibold text-base">{user.bio}</p>
        </div>
      </div>
      <div className="flex justify-end items-end">
        {user.id !== getUserId() &&
          <div>
            <Button 
              icon={follow ? RiUserUnfollowLine : RiUserFollowLine}
              label={follow ? "Takip Bırak" : "Takibi Et"}
              secondary={follow}
              onClick={handleFollow}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default ProfileHeader
