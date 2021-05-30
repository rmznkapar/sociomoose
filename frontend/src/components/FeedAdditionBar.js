import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APP_ROUTE } from '../constants/Routes';
import { selectUser, userFollowers, userFollowings } from '../features/userSlice';
import UserPP from './common/UserPP';

const FeedAdditionBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    console.log('reererer');
    dispatch(userFollowers({userId: user.id})).then((res) => {
      if (!res.payload.error) {
        setFollowers(res.payload.data.users)
      } else {
        console.log(res.payload);
      }
    })
    dispatch(userFollowings({userId: user.id})).then((res) => {
      if (!res.payload.error) {
        setFollowings(res.payload.data.users)
      } else {
        console.log(res.payload);
      }
    })
  }, [])

  return (
    <div>
      <div>
        <div className="flex flex-col px-6 py-4 rounded-2xl bg-white mb-8">
          <p className="text-lg font-semibold pb-3 mb-3 border-b border-gray-200">Takipçilerin</p>
          {followers.map((follower) => (
            <a href={APP_ROUTE.MY_PROFILE+'/'+follower.id} key={follower.id} className="flex items-center py-2">
              <UserPP temp={follower.username} />
              <p className="ml-4 text-lg font-semibold">{follower.username}</p>
            </a>
          ))}
        </div>
        <div className="flex flex-col px-6 py-4 rounded-2xl bg-white">
          <p className="text-lg font-semibold pb-3 mb-3 border-b border-gray-200">Takip Ettiklerin</p>
          {followings.map((following) => (
            <a href={APP_ROUTE.MY_PROFILE+'/'+following.id} key={following.id} className="flex items-center py-2">
              <UserPP temp={following.username} />
              <p className="ml-4 text-lg font-semibold">{following.username}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedAdditionBar
