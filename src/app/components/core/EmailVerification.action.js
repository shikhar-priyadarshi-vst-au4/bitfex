import { SET_CURRENT_USER, SEND_EMAIL, GET_ERRORS, CLEAR_ERRORS } from '../../redux_store/types';


export const setCurrentUser = (data) => ({
    type: SET_CURRENT_USER,
    payload: data
})

export const sendEmail = (data) => ({
    type: SEND_EMAIL,
    payload: data
})

export const setErrors = (error) => ({
    type: GET_ERRORS,
    payload: error?.response?.data || "Error Unexpected"
})

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
