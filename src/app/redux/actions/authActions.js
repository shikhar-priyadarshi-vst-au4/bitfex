import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_ERRORS,
} from '../types';

const {SERVER_URL} = process.env;
const BASE_URL = 'https://dev.bitfex.com/api/v1';

// Register User
export const registerUser = (UserForm, history) => (dispatch) => {
  axios
    .post(`${BASE_URL}/users/sign_up`, UserForm)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error.response));
};

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
      // Save to localStorage
      const {jwt, email, first_name, last_name} = res.data;
      // Set token to ls
      localStorage.setItem('token', jwt);
      // Set token to Auth header
      setAuthToken(jwt);
      // Decode token to get user data
      const decoded = jwt_decode(jwt);
      // Set current user
      dispatch(setCurrentUser(decoded, email, first_name, last_name));
    })
    .catch((error) =>
      dispatch({
        type: GET_ERRORS,
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
  // Remove token from localStorage
  localStorage.removeItem('token');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  dispatch({
    type: LOGOUT,
    payload: {},
  });
};

export const changePassword = (UserPasswordDetails) => (dispatch) => {
  // changing user password
  axios
    .post(`${BASE_URL}/users/change_password`, UserPasswordDetails)
    .then((res) =>
      dispatch({
        type: USER_PASSWORD_CHANGE,
        payload: res.data,
      }),
    )
    .catch((error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      }),
    );
};
