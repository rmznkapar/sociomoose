import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserPP from './common/UserPP';
import { FiSend, FiHeart, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { deletePost, likePost } from './../features/postSlice';
import { APP_ROUTE } from '../constants/Routes';
import { showComments } from '../features/modalSlice';
import { selectUser } from '../features/userSlice';

const Post = ({postId, user, date, content, img, likeCount, commentCount, alreadyLiked}) => {
  
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectUser);
  const [isLiked, setIsLiked] = useState(alreadyLiked);
  const [optionsDropdown, setOptionsDropdown] = useState(false);

  const dateFormatter = (date) => date.split('T')[0].replaceAll('-', '.') + ' - '+  date.split('T')[1].substring(0,5);

  const handleLike = (postId) => {
    dispatch(likePost({postId})).then((res) => {
      console.log(res);
      if (!res.payload.error) {
        setIsLiked(!isLiked);
      }
    })
  }
  
  const handleComments = (postId) => {
    console.log(postId);
    dispatch(showComments({postId}));
  }
  
  const optionsClick = (e) => {
    if (e.type === "blur") {
      setTimeout(() => { 
        setOptionsDropdown(false);
      }, 200);
    } else {
      setOptionsDropdown(true);
    }
  }

  const handleDeletePost = () => {
    console.log('red');
    dispatch(deletePost({postId: postId})).then((res) => {
      console.log(res);
      if (!res.payload.error) {
        alert("Gönderi başarı ile silindi");
        window.location.reload();
      } else {
        alert("Gönderi silinemedi")
      }
    });
  }

  return (
    <div>
      <div className="pt-6 bg-white shadow-sm rounded-2xl relative">
        <div className="px-6 flex justify-between">
          <a href={APP_ROUTE.MY_PROFILE+'/'+user.id} className="flex">
            <UserPP temp={user.username} url={user.pp} />
            <div className="ml-4">
              <p className="font-semibold">{user.username}</p>
              <p className="text-helper">{dateFormatter(date)}</p>
            </div>
          </a>
          {user.id === loggedUser.id &&
            <div 
              className="pl-4 pb-4 cursor-pointer relative z-10 focus:ring-0" 
              onBlur={(e) => optionsClick(e)}
              onFocus={(e) => optionsClick(e)}
            > 
              <button className="text-2xl font-bold">
                <FiMoreHorizontal />
              </button>
              <div className={"absolute -left-2/4 bg-white w-56 shadow-md rounded-2xl "+(optionsDropdown ? " block": " hidden")}>
                <div 
                  className="text-error font-semibold text-lg rounded-2xl hover:bg-whitehover p-4"
                  onClick={() => handleDeletePost()}
                >
                  Gönderiyi Sil
                </div>
              </div>
            </div>
          }
        </div>
        <div className="px-6 mt-6">
          {content}
        </div>
        {img && 
          <div className="mt-6">
            <img className="mx-auto rounded-2xl" src={img} alt='post' />
          </div>
        }
        <div className="mt-6 border-t cursor-pointer border-gray-200">
          <div className="flex text-3xl select-none">
            <div 
              onClick={() => handleLike(postId)} 
              className={"w-1/2 py-6 flex justify-center rounded-bl-2xl hover:bg-whitehover "+(isLiked ? 'text-like' : '')}
            >
              <FiHeart />
              <span className="text-xl mt-4">{likeCount + isLiked - alreadyLiked}</span>
            </div>
            <div 
              onClick={() => handleComments(postId)} 
              className="w-1/2 py-6 flex justify-center hover:bg-whitehover"
            >
              <FiMessageCircle />
              <span className="text-xl mt-4">{commentCount}</span>
            </div>
            {/* <div className="w-1/3 py-6 flex justify-center rounded-br-2xl hover:bg-whitehover">
              <FiSend />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
