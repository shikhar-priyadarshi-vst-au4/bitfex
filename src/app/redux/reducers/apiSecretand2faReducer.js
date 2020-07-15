import {ALL_API_SECRET_KEY, GOOGLE_TWOFA_KEY, SET_2FA_STATUS} from '../types';

const initialState = {
  apisecretkeys: '',
  loading: true,
  twofakey: '',
  twofastatus: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_API_SECRET_KEY:
      return {
        ...state,
        apiSecretKeysArray: action.payload,
        loading: false,
      };
    case GOOGLE_TWOFA_KEY:
      console.log(action.payload);
      return {
        ...state,
        twofakey: action.payload,
        loading: false,
      };
    case SET_2FA_STATUS:
      return {
        twofastatus: action.payload,
      };
    default:
      return state;
  }
}
