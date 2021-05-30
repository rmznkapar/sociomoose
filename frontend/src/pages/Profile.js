import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { userProfile } from '../features/userSlice';
import Sidebar from '../components/Sidebar'
import UserNavbar from '../components/UserNavbar'
import { getAllPost } from '../features/postSlice';
import Post from '../components/Post';
import { API_ROUTE } from '../constants/Routes';
import { getUser } from '../utils/Common';
import ProfileHeader from '../components/ProfileHeader';
import FeedCreateContent from './../components/FeedCreateContent';
import ProfileAdditionBar from './../components/ProfileAdditionBar';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let ownProfile = false;
  
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  
  let userId = id;
  if (!id) {
    userId = getUser().id;
    ownProfile = true;
  }
  
  useEffect(() => {
    dispatch(userProfile({userId})).then((res) => {
      if (!res.payload.error) {
        setUser(res.payload.data);
        dispatch(getAllPost({limit: 10, offset: 0, userId})).then(postRes => {
          if (!postRes.payload.error) {
            setPosts(postRes.payload.data);
          } else {
            console.log(postRes.payload.error);
          }
        })
      }
    })
  }, [])

  return (
    <div className="text-blackness">
      <div>
        <UserNavbar />
      </div>
      <div className="container mx-auto pt-8">
        <div className="flex">
          <div className="w-96 md:w-124">
            <Sidebar />
          </div>
          <div className="w-full px-8">
            {/* <div>
              <FeedCreateContent />
            </div> */}
            {user && 
              <ProfileHeader user={user} />
            }
            {ownProfile &&
              <div className="mt-8">
                <FeedCreateContent />
              </div>
            }
            <div className="w-full">
              <div className="mt-8">
                {posts.map(post => (
                  <div key={post.id} className="mt-6">
                    <Post 
                      postId={post.id}
                      user={{id: post.user_id, username: post.username, pp: null}}
                      date={post.date}
                      content={post.content}
                      img={post.img_name ? API_ROUTE.POST_IMGS + post.img_name : false}
                      likeCount={post.like_count}
                      commentCount={post.comment_count}
                      alreadyLiked={post.liked}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-96 md:w-124">
            <ProfileAdditionBar userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
