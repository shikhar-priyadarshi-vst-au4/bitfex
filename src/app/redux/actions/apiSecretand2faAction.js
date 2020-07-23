import axios from 'axios';
import {BaseApiUrl} from '../config';
import {
  ALL_API_SECRET_KEY,
  GOOGLE_TWOFA_KEY,
  SET_2FA_STATUS,
  GET_ERRORS,
} from '../types';
import store from '../store';

const BASE_URL = 'https://dev.bitfex.com/api/v1';

// Get All Api secret key

export const allapisecretkey = () => (dispatch) => {
  let url = BaseApiUrl + '/users/get_all_key_pairs';

  axios.get(url).then((res) => {
    let apiSecretKeysArray = res.data.map((item) => {
      return {...item, secret: '*************'};
    });
    dispatch({type: ALL_API_SECRET_KEY, payload: apiSecretKeysArray});
  });
};

// Delete api key

export const deleteapikey = (name) => (dispatch) => {
  // console.log(name);
  let url = BaseApiUrl + '/users/delete_key_pair';
  axios.post(url, {name}).then((res) => {
    // console.log(res.data);
    let ar = store.getState().apisecretkeys.apiSecretKeysArray;
    let newarr = ar.filter((item) => item.name != name);
    dispatch({type: ALL_API_SECRET_KEY, payload: newarr});
  });
};

// Genrate a key

export const addapisecretkey = (name) => (dispatch) => {
  let url = BaseApiUrl + '/users/generate_key_pair';
  axios
    .post(url, {name})
    .then((res) => {
      let {secret_key} = res.data;
      let ar = store.getState().apisecretkeys.apiSecretKeysArray;
      if (Array.isArray(ar)) ar.unshift({...res.data, secret: secret_key});
      else ar = [{...res.data, secret: secret_key}];
      dispatch({type: ALL_API_SECRET_KEY, payload: ar});
    })
    .catch((e) => {
      console.log(e);
    });
};

// clear keys

export const clearKeys = () => {
  return {type: ALL_API_SECRET_KEY, payload: []};
};

// Get 2fa secret key

export const googletwofakey = () => (dispatch) => {
  let url = BaseApiUrl + '/users/secret_key_2fa';
  axios
    .get(url)
    .then((res) =>
      dispatch({
        type: GOOGLE_TWOFA_KEY,
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

// Enable/Disable 2FA

export const setTwoFAKey = (token_2fa, enabled_2fa) => (dispatch) => {
  let url = BaseApiUrl + '/users/change_2fa_status';
  axios
    .post(url, {token_2fa, enabled_2fa})
    .then((res) => {
      // console.log(res.data);
      let {enabled_2fa} = res.data;
      dispatch({type: SET_2FA_STATUS, payload: enabled_2fa});
      dispatch(googletwofakey());
    })
    .catch((error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      }),
    );
};
