import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUpload, postGetAll, postLike, getComments, makeComment, postDelete, postGetSpec } from '../api/postApi';

export const uploadPost = createAsyncThunk(
  'post/uploadPost',
  async ({content, imgFile}) => {
    const response = await postUpload(content, imgFile);
    return response;
  }
);

export const getAllPost = createAsyncThunk(
  'post/getAllPost',
  async ({limit, offset, userId}) => {
    const response = await postGetAll(limit, offset, userId);
    return response;
  }
); 

export const getSpecPost = createAsyncThunk(
  'post/getSpecPost',
  async ({limit, offset}) => {
    const response = await postGetSpec(limit, offset);
    return response;
  }
); 

export const likePost = createAsyncThunk(
  'post/likePost',
  async ({postId}) => {
    const response = await postLike(postId);
    return response;
  }
); 

export const commentPost = createAsyncThunk(
  'post/commentPost',
  async ({postId, content}) => {
    const response = await makeComment(postId, content);
    return response;
  }
);

export const commentsPost = createAsyncThunk(
  'post/commentsPost',
  async ({postId}) => {
    const response = await getComments(postId);
    return response;
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({postId}) => {
    const response = await postDelete(postId);
    return response;
  }
);

export const postSlice = createSlice(({
  name: "post",
  initialState: {
    post: null,
    posts: [],
    error: false,
    status: 'idle'
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.status = 'idle';
        getAllPost(10, 0);
        if (!action.payload.error) {
          state.post = action.payload.data.post;
        } else {
          state.error = action.payload.error;
        }
      });
    builder
      .addCase(getAllPost.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.posts = action.payload.data.posts;
        } else {
          state.error = action.payload.error;
        }
      });
  }
}));

export const { setError } = postSlice.actions;

export const selectPosts = (state) => state.post.posts;
export const selectPost = (state) => state.post.post;
export const selectError = (state) => state.post.error;
export const selectStatus = (state) => state.post.status;

export default postSlice.reducer;