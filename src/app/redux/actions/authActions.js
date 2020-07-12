import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import {BaseApiUrl} from '../config';

import {
  SET_ERRORS,
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_MFA_STATUS,
} from '../types';

const BASE_URL = BaseApiUrl;

// Register User

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${BASE_URL}/users/sign_in`, userData, {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
      },
    })
    .then((res) => {
      const {jwt, email, first_name, last_name} = res.data;
      localStorage.setItem('token', jwt);
      // Set token to Auth header
      setAuthToken(jwt);
      const decoded = jwt_decode(jwt);
      dispatch(setCurrentUser(decoded, email, first_name, last_name));
    })
    .catch((error) =>
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      }),
    );
};

// Set logged in user
export const setCurrentUser = (decoded, email, first_name, last_name) => {
  return {
    type: SET_CURRENT_USER,
    payload: {decoded, email, first_name, last_name},
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch({
    type: LOGOUT,
  });
};

export const changePassword = (UserPasswordDetails) => (dispatch) => {
  // changing user password
  axios
    .post(`${BASE_URL}/users/change_password`, UserPasswordDetails)
    .then((res) =>
      dispatch({
        type: USER_PASSWORD_CHANGE,
        payload: true,
      }),
    )
    .catch((error) =>
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      }),
    );
};

export const resetChangePassword = () => {
  return {type: USER_PASSWORD_CHANGE, payload: false};
};

export const setMFAAuthentication = (permittedAction) => {
  return {type: SET_MFA_STATUS, payload: permittedAction};
};

export const resetMFAAuthentication = () => {
  return {type: SET_MFA_STATUS, payload: null};
};
