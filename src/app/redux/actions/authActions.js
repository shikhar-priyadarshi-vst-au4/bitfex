import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import {SET_ERRORS, SET_CURRENT_USER, LOGOUT} from '../types';

const {SERVER_URL} = process.env;
const BASE_URL = 'https://uat.alpha5.io/api/v1';

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
      // Retrieve data
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
