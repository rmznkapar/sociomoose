import axios from 'axios';
import { API_ROUTE } from '../constants/Routes';
import { getToken, getUserId } from '../utils/Common';

export const postUpload = async (content, imgFile) => {
  try {
    var formData = new FormData();
    formData.append('content', content);
    formData.append('img_file', imgFile);

    const res = await axios({
      method: "post",
      url: API_ROUTE.UPLOAD_POST,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
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
    console.log(error);
    return {
      data: false,
      error: 'BAD_REQUEST'
    };
  }
}

export const postGetAll = async (limit=10, offset=0, userId=null) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.GET_ALL_POST,
      data: {
        limit: limit,
        offset: offset,
        user_id: userId
      },
      headers: {
        "Content-Type": "application/json",
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

export const postGetSpec = async (limit=10, offset=0) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.GET_SPEC_POST,
      data: {
        limit: limit,
        offset: offset,
      },
      headers: {
        "Content-Type": "application/json",
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

export const postLike = async (postId) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.LIKE_POST,
      data: {
        post_id: postId
      },
      headers: {
        "Content-Type": "application/json",
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

export const makeComment = async (postId, content) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.MAKE_COMMENT,
      data: {
        post_id: postId,
        content: content
      },
      headers: {
        "Content-Type": "application/json",
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

export const getComments = async (postId) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.GET_COMMENTS,
      data: {
        post_id: postId,
      },
      headers: {
        "Content-Type": "application/json",
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

export const postDelete = async (postId) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.DELETE_POST,
      data: {
        post_id: postId,
      },
      headers: {
        "Content-Type": "application/json",
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
    }
  }
}