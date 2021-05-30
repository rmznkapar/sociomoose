import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import modalReducer from '../features/modalSlice';
import postReducer from '../features/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    post: postReducer
  },
});
