import axios from 'axios';
import { API_ROUTE } from '../constants/Routes';
import { getUserId, getToken } from '../utils/Common';

export const getProfile = async (userId) => {
  try {
    console.log(userId);
    const res = await axios({
      method: "post",
      url: API_ROUTE.GET_PROFILE,
      data: {
        user_id: userId,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": getToken(),
        "user-id": getUserId(),
      },
    });

    if (!res.data.error) {
      return {
        data: res.data.data,
        error: res.data.error
      };
    }
    return {
      data: false,
      error: res.data.error || 'UNKNOWN_ERROR'
    }
  } catch (error) {
    return {
      data: false,
      error: 'BAD_REQUEST'
    };
  }
}

export const followUser = async (followingId) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.FOLLOW_USER,
      data: {
        following_id: followingId,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": getToken(),
        "user-id": getUserId(),
      },
    });

    if (!res.data.error) {
      return {
        data: res.data.data,
        error: res.data.error
      };
    }
    return {
      data: false,
      error: res.data.error || 'UNKNOWN_ERROR'
    }
  } catch (error) {
    return {
      data: false,
      error: 'BAD_REQUEST'
    };
  }
}

export const getFollowers = async (userId) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.GET_FOLLOWERS,
      data: {
        user_id: userId,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": getToken(),
        "user-id": getUserId(),
      },
    });

    console.log(res.data);
    if (!res.data.error) {
      return {
        data: res.data.data,
        error: res.data.error
      };
    }
    return {
      data: false,
      error: res.data.error || 'UNKNOWN_ERROR'
    }
  } catch (error) {
    return {
      data: false,
      error: 'BAD_REQUEST'
    };
  }
}

export const getFollowings = async (userId) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.GET_FOLLOWINGS,
      data: {
        user_id: userId,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": getToken(),
        "user-id": getUserId(),
      },
    });

    if (!res.data.error) {
      return {
        data: res.data.data,
        error: res.data.error
      };
    }
    return {
      data: false,
      error: res.data.error || 'UNKNOWN_ERROR'
    }
  } catch (error) {
    return {
      data: false,
      error: error
    };
  }
}

export const updateBio = async (bio) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.UPDATE_BIO,
      data: {
        bio: bio,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": getToken(),
        "user-id": getUserId(),
      },
    });

    if (!res.data.error) {
      return {
        data: res.data.data,
        error: res.data.error
      };
    }
    return {
      data: false,
      error: res.data.error || 'UNKNOWN_ERROR'
    }
  } catch (error) {
    return {
      data: false,
      error: error
    };
  }
}