export const API_URL = 'http://localhost:8080/api/';
export const MAIN_URL = 'http://localhost:8080';

export const API_ROUTE = {
  LOGIN: API_URL + 'auth/login',
  REGISTER: API_URL + 'auth/register',
  UPDATE_PASSWORD: API_URL + 'auth/updatePassword',
  UPLOAD_POST: API_URL + 'post/upload',
  GET_ALL_POST: API_URL + 'post/getAll',
  GET_SPEC_POST: API_URL + 'post/getSpec',
  LIKE_POST: API_URL + 'post/like',
  DELETE_POST: API_URL + 'post/deletePost',
  GET_COMMENTS: API_URL + 'post/getComments',
  MAKE_COMMENT: API_URL + 'post/makeComment',
  GET_PROFILE: API_URL + 'user/getProfile',
  FOLLOW_USER: API_URL + 'user/followUser',
  GET_FOLLOWERS: API_URL + 'user/getFollowers',
  GET_FOLLOWINGS: API_URL + 'user/getFollowings',
  UPDATE_BIO: API_URL + 'user/updateBio',
  POST_IMGS: MAIN_URL + '/posts/',
  PP_IMGS: MAIN_URL + '/pp/',
}

export const APP_ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FEED: '/feed',
  SPEC_FEED: '/timeline',
  MY_PROFILE: '/profile',
  SETTINGS: '/settings',
  LISTS: '/lists',
  TREND: '/trend',
  PROFILE: '/profile/:id'
};