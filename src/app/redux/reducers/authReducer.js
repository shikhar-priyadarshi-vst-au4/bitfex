import isEmpty from '../../validation/is-empty';

import {SET_CURRENT_USER, LOGOUT} from '../types';

const initialState = {
  isAuthenticated: false,
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
      };
    default:
      return state;
  }
}
