import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import FeedCreateContent from '../components/FeedCreateContent';
import Sidebar from '../components/Sidebar';
import UserNavbar from '../components/UserNavbar';
import { getSpecPost } from '../features/postSlice';
import { API_ROUTE } from '../constants/Routes';
import Post from '../components/Post';
import FeedAdditionBar from '../components/FeedAdditionBar';

const SpecFeed = () => {
  const dispatch = useDispatch();
  
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    dispatch(getSpecPost({limit: 10, offset: 0})).then((res) => {
      if (!res.payload.error) {
        setPosts(res.payload.data);
        console.log(res.payload.data);
      }
    });
  }, []);

  return (
    <div>
      <div>
        <UserNavbar />
      </div>
      <div className="container mx-auto pt-8">
        <div className="flex">
          <div className="w-96 md:w-124">
            <Sidebar />
          </div>
          <div className="w-full px-8">
            <div>
              <FeedCreateContent />
            </div>
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
          <div className="w-96 md:w-124">
            <FeedAdditionBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecFeed
