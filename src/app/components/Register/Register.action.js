import { REGISTER_DATA, GET_ERRORS } from '../../redux_store/types';

export const register = (data) => ({
    type: REGISTER_DATA,
    payload: data
})

export const setErrors = (error) => ({
    type: GET_ERRORS,
    payload: error?.response?.data || "Error Unexpected"
})
