import { FORGOT_PASSWORD, GET_ERRORS, CLEAR_ERRORS } from '../../redux_store/types';

export const forgetPassword = (data) => ({
    type: FORGOT_PASSWORD,
    payload: data
})

export const setErrors = (error) => ({
    type: GET_ERRORS,
    payload: error?.response?.data
})

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
