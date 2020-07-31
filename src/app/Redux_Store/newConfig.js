import axios from 'axios';
import {cond} from 'lodash';

export default axios.create({
  baseURL: 'https://uat.alpha5.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

axios.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});
axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});
