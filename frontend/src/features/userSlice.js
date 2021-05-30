import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authLogin, authRegister, updatePassword } from '../api/authApi';
import { getProfile, followUser, getFollowers, getFollowings, updateBio } from '../api/userApi';
import { getUser, getUserId, removeUserToken } from '../utils/Common';

export const userLogin = createAsyncThunk(
  'user/authLogin',
  async ({username, password}) => {
    const response = await authLogin(username, password);
    return response;
  }
);

export const userRegister = createAsyncThunk(
  'user/authRegister',
  async ({email, username, password}) => {
    const response = await authRegister(email, username, password);
    return response;
  }
);

export const authUpdatePassword = createAsyncThunk(
  'user/authUpdatePassword',
  async ({currPass, newPass}) => {
    const response = await updatePassword(currPass, newPass);
    return response;
  }
);

// bu normal reducer seklindede yazilabilir
export const userLogout = createAsyncThunk(
  'user/authLogout',
  async () => {
    removeUserToken();
    return true;
  }
)

export const userProfile = createAsyncThunk(
  'user/userProfile',
  async ({userId}) => {
    const response = await getProfile(userId);
    return response;
  }
);

export const userFollow = createAsyncThunk(
  'user/followUser',
  async ({followingId}) => {
    const response = await followUser(followingId);
    return response;
  }
);

export const userFollowers = createAsyncThunk(
  'user/userFollowers',
  async ({userId}) => {
    const response = await getFollowers(userId);
    return response;
  }
);

export const userFollowings = createAsyncThunk(
  'user/userFollowings',
  async ({userId}) => {
    const response = await getFollowings(userId);
    return response;
  }
);

export const userUpdateBio = createAsyncThunk(
  'user/userUpdateBio',
  async ({bio}) => {
    const response = await updateBio(bio);
    return response;
  }
);


export const userSlice = createSlice(({
  name: "user",
  initialState: {
    user: getUser(),
    auth: getUserId() ? true : false,
    error: false,
    status: 'idle'
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'idle';

        if (!action.payload.error) {
          state.user = action.payload.data.user;
          state.auth = true;
        } else {
          state.error = action.payload.error;
        }
      });
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = 'idle';

        if (!action.payload.error) {
          state.user = action.payload.data.user;
          state.auth = true;
        } else {
          state.error = action.payload.error;
        }
      });
  }
}));

export const { setError, setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export const selectAuth = (state) => state.user.auth;

export default userSlice.reducer;