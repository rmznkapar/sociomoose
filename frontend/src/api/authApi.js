import axios from 'axios';
import { API_ROUTE } from '../constants/Routes';
import { setUserToken, setUser, getToken, getUserId } from '../utils/Common';

export const authLogin = async (username, password) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.LOGIN,
      data: {
        username: username,
        password: password
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });

    if (!res.data.error) {
      setUserToken(res.data.data.token, res.data.data.user.id);
      setUser(res.data.data.user);
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
      data: null,
      error: 'BAD_REQUEST'
    };
  }
}

export const authRegister = async (email, username, password) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.REGISTER,
      data: {
        email: email,
        username: username,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });

    if (!res.data.error) {
      setUserToken(res.data.data.token, res.data.data.user.id);
      setUser(res.data.data.user);
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

export const updatePassword = async (currPass, newPass) => {
  try {
    const res = await axios({
      method: "post",
      url: API_ROUTE.UPDATE_PASSWORD,
      data: {
        curr_pass: currPass,
        new_pass: newPass,
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
      error: error
    };
  }
}