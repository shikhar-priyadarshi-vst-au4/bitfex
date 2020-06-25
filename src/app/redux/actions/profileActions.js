import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from '../types';

const BASE_URL =
  'http://a709df5a6c069404588da7c01c9fb326-1769513376.ap-south-1.elb.amazonaws.com/api/v1';

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  axios
    .get(`${BASE_URL}/users/me`, {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
      },
    })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((error) => console.log(error));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
