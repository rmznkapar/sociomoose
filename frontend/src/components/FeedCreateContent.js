import React from 'react'
import { FiSend } from 'react-icons/fi';
import UserPP from './common/UserPP';
import { useDispatch } from 'react-redux';
import { showToggle } from '../features/modalSlice';

const FeedCreateContent = () => {

  const dispatch = useDispatch()

  const handleCreateClick = () => {
    dispatch(showToggle())
  }

  return (
    <div>
      <div 
        className="p-6 rounded-2xl bg-white flex items-center justify-between cursor-pointer shadow-sm"
        onClick={handleCreateClick}
      >
        <div className="flex items-center">
          <UserPP />
          <div className="ml-4">
            <p className="font-semibold text-helper">Hey, bir şeyler paylaşmak ister misin?</p>
          </div>
        </div>
        <div 
          className="ml-4 py-2 md:py-2.5 px-4 flex items-center font-medium text-white bg-primary rounded-xl cursor-pointer">
          <div className="text-lg">
            <FiSend />
          </div>
          <p className="ml-2">
            Paylaş
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedCreateContent
