import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

const UserPP = ({url, temp, size=12}) => {
  const user = useSelector(selectUser); 
  const sizeClass = `w-${size} h-${size}`
  
  return (
    <div 
      className={"flex flex-shrink-0 items-center justify-center font-medium bg-holder rounded-xl cursor-pointer "+sizeClass}
    >
      {url ? (
        <img className="rounded-xl" src={url} alt="user_img" />
      ) : (
        <div className="py-2 md:py-2.5 px-4 text-lg">
          {temp ? temp[0].toLocaleUpperCase() : user.username[0].toLocaleUpperCase()}
        </div>
      )}
    </div>
  )
}

export default UserPP;
