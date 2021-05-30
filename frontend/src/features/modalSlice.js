import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice(({
  name: 'modal',
  initialState: {
    show: false,
    showComments: false,
    commentPostId: null
  },
  reducers: {
    showToggle: (state) => {
      state.show = !state.show;
      document.documentElement.style.overflow = state.show ? 'hidden' : 'auto';
    },
    showComments: (state, action) => {
      state.showComments = !state.showComments;
      if (state.showComments) {
        console.log(action.payload);
        state.commentPostId = action.payload.postId;
      } else {
        state.commentPostId = null;
      }
      document.documentElement.style.overflow = state.showComments ? 'hidden' : 'auto';
    }
  }
}));

export const { showToggle, showComments } = modalSlice.actions;

export const selectShow = (state) => state.modal.show;
export const selectShowComments = (state) => state.modal.showComments;
export const selectCommentPostId = (state) => state.modal.commentPostId;

export default modalSlice.reducer;