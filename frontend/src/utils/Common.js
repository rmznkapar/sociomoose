import { APP_ROUTE } from "../constants/Routes";

export const getUserId = () => {
  const userStr = parseInt(localStorage.getItem('socimoose_user_id'));
  if (userStr) return userStr;
  else return null;
}

export const getUser = () => {
  const userStr = localStorage.getItem('socimoose_user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

export const getToken = () => {
  return localStorage.getItem('socimoose_token') || null;
}

export const removeUserToken = (redirect=true) => {
  localStorage.removeItem('socimoose_token');
  localStorage.removeItem('socimoose_user_id');
  localStorage.removeItem('socimoose_user');
  if (redirect) {
    window.location.href = APP_ROUTE.LOGIN;
  }
}

export const setUser = (user) => {
  localStorage.setItem('socimoose_user', JSON.stringify(user))
}

export const setUserToken = (session, user_id) => {
  localStorage.setItem('socimoose_token', session);
  localStorage.setItem('socimoose_user_id', user_id);
}
