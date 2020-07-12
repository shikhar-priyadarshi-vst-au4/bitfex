import isEmpty from '../../validation/is-empty';

import {
  SET_CURRENT_USER,
  LOGOUT,
  USER_PASSWORD_CHANGE,
  SET_MFA_STATUS,
} from '../types';

const getFromLS = (key) => localStorage.getItem('token');

const initialState = {
  isAuthenticated: !isEmpty(getFromLS('token')),
  loading: true,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
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
        user: {},
      };

    // shows and hides password changed modal
    case USER_PASSWORD_CHANGE:
      return {
        ...state,
        passwordChanged: action.payload,
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
