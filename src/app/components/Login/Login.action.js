import { LOGIN_DATA, SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from '../../redux_store/types';

export const loginSuccess = (data) => ({
    type: LOGIN_DATA,
    payload: data
})

export const setCurrentUser = (data) => ({
    type: SET_CURRENT_USER,
    payload: data
})

export const setErrors = (error) => ({
    type: GET_ERRORS,
    payload: error?.response?.data || "undefined"
})

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
