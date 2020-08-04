import {GET_ALL_API_SECRET_KEY, GENERATE_KEY_PAIR_STATUS} from '../types';

const initialState = {
  apisecretkeys: [],
  loading: true,
  generateKeyPairStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_API_SECRET_KEY:
      return {
        ...state,
        apiSecretKeysArray: action.payload,
        loading: false,
      };
    case GENERATE_KEY_PAIR_STATUS:
      return {
        ...state,
        generateKeyPairStatus: action.payload,
      };
    default:
      return state;
  }
};
