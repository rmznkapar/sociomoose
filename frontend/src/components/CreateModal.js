import React, { useRef, useState } from 'react';
import { FiSend, FiImage } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { selectShow, showToggle } from '../features/modalSlice';
import { uploadPost, selectStatus, selectError } from '../features/postSlice';
import loading from '../assets/img/loading.svg'
import UserPP from './common/UserPP';

const CreateModal = () => {

  const dispatch = useDispatch();
  const show = useSelector(selectShow);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const imgUploadRef = useRef();

  const [imgFile, setImgFile] = useState(null);
  const [content, setContent] = useState('');

  const handleShare = () => {
    console.log(content);
    dispatch(
      uploadPost({ content, imgFile })
    );
    if (!error) {
      dispatch(showToggle());
      setImgFile(null);
      setContent('');
    }
  }

  const handelOutsideClick = () => {
    dispatch(showToggle());
    setImgFile(null);
    setContent('');
  }

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
          <div className="flex items-center justify-between">
            <div className="flex items-start w-full">
              <UserPP />
              <div className="ml-4 w-full">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5} 
                  className="w-full border-holder rounded-2xl">
                </textarea>
                {imgFile &&
                  <div>
                    <img className="mx-auto rounded-2xl w-full" src={URL.createObjectURL(imgFile)} alt='pass' />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div>
              <input 
                ref={imgUploadRef} 
                className="hidden" 
                type="file" 
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setImgFile(e.target.files[0])}
              />
              <div 
                className="text-2xl p-2 text-blackness border-2 border-holder rounded-xl cursor-pointer"
                onClick={() => imgUploadRef.current.click()}
              >
                <FiImage/>
              </div>
            </div>
            <div 
              onClick={() => handleShare()}
              className="py-2 md:py-2.5 px-4 flex items-center font-medium text-white bg-primary rounded-xl cursor-pointer">
              <div className="text-lg">
                {status === 'idle' ? 
                  (
                    <FiSend />
                  ):(
                    <img src={loading} alt="loading" />
                  )
                }
              </div>
              <p className="ml-2">
                Paylaş
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateModal
