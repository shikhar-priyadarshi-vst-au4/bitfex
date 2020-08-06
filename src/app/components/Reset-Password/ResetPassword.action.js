import { RESET_PASSWORD, GET_ERRORS, CLEAR_ERRORS } from '../../redux_store/types';

export const setResetPassword = (data) => ({
    type: RESET_PASSWORD,
    payload: data
})


export const setErrors = (error) => ({
    type: GET_ERRORS,
    payload: error?.response?.data || "Error Unexpected!"
})

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
