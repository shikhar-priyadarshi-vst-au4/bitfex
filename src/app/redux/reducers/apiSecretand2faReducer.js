import {ALL_API_SECRET_KEY} from '../types';

const initialState = {
  apisecretkeys: '',
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_API_SECRET_KEY:
      return {
        ...state,
        apisecretkeys: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
