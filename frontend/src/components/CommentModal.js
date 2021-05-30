import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiMessageCircle } from 'react-icons/fi';

import { selectShowComments, showComments, selectCommentPostId} from '../features/modalSlice';
import { selectUser } from '../features/userSlice';
import UserPP from './common/UserPP';
import Input from './common/Input';
import Button from './common/Button';
import { commentPost, commentsPost } from './../features/postSlice';

const CommentModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectShowComments);
  const user = useSelector(selectUser);
  const postId = useSelector(selectCommentPostId)

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handelOutsideClick = () => {
    dispatch(showComments());
    setComment('');
  }

  const handleComment = () => {
    dispatch(commentPost({postId: postId, content: comment})).then((res) => {
      if (!res.payload.error) {
        console.log(res.payload);
        setComments([...comments, res.payload.data.post])
      } else {
        console.log(res.payload);
      }
    });
    setComment('');
  }

  useEffect(() => {
    if (!show) {
      return;
    }
    console.log('123123123123');
    dispatch(commentsPost({postId: postId})).then((res) => {
      if (!res.payload.error) {
        console.log(res.payload);
        setComments(res.payload.data.comments)
      } else {
        console.log(res.payload);
      }
    })
  }, [show])

  if (!show) {
    return (<div></div>)
  }

  return (
    <div>
      <div 
        className="absolute w-full h-full bg-black bg-opacity-40 z-10 flex justify-center items-start"
        onClick={() => handelOutsideClick()}
      >
        <div 
          className="mt-12 md:mt-30 w-full sm:w-136 p-6 bg-white rounded-2xl"
          onClick={(e) => {e.stopPropagation();}}
        >
          <h1 className="font-bold text-2xl">Yorumlar</h1>
          <div className="my-12">
            {comments.length < 1 ?
              (
                <div className="text-center py-5">
                  Henüz yorum yapılmamış...
                </div>
              ): comments.map((comment) => (
                <div key={comment.comment_id} className="flex py-2">
                  <UserPP temp={comment.username} />
                  <div className="ml-4">
                    <p className="font-semibold">{comment.username}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div>
            <div className="flex items-center">
              <UserPP temp={user.username} />
              <div className="flex-grow mx-3">
                <Input 
                  type="text"
                  placeholder="Yorumunu buraya yaz"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div>
                <Button 
                  icon={FiMessageCircle}
                  label="Yorumla"
                  onClick={handleComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentModal
