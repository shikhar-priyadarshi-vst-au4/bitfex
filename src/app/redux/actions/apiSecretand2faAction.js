import axios from 'axios';
import {ALL_API_SECRET_KEY} from '../types';

const BASE_URL = 'https://dev.bitfex.com/api/v1';

// Get All Api secret key
export const allapisecretkey = () => (dispatch) => {
  axios
    .get(`${BASE_URL}/users/get_all_key_pairs`, {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
      },
    })
    .then((res) =>
      dispatch({
        type: ALL_API_SECRET_KEY,
        payload: res.data,
      }),
    )
    .catch((error) => console.log(error.response));
};
