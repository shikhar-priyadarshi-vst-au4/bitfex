import isEmpty from '../../validation/is-empty';

import {
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_MFA_STATUS,
  REGISTER_DATA,
  LOGIN_DATA,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../types';

const getFromLS = (key) => localStorage.getItem('token');

const initialState = {
  isAuthenticated: !isEmpty(getFromLS('token')),
  loading: true,
  user: {},
  userNewpassword: '',
  registerInfo: '',
  logInInfo: '',
  forgotPasswordEmail: '',
  resetPasswordValue: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_DATA:
      return {
        ...state,
        registerInfo: action.payload,
        loading: false,
      };
    case LOGIN_DATA:
      return {
        ...state,
        logInInfo: action.payload,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        loading: false,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case USER_PASSWORD_CHANGE:
      return {
        ...state,
        userNewpassword: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordEmail: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPasswordValue: action.payload,
      };
    case SET_MFA_STATUS:
      return {
        ...state,
        currentMFAaction: action.payload,
      };
    default:
      return state;
  }
}
