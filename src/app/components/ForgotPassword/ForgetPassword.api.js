import API from '../../redux_store/config';
import { forgetPassword, setErrors } from './ForgetPassword.action';
class ForgetApi {
    constructor() { }
    static forgotPassword = (email) => {
        return async (dispatch) => {
            try {
                let response = await API.get(`/users/forgot_password?email=${email}`);
                dispatch(forgetPassword(response.data));
            }
            catch (error) {
                dispatch(setErrors(error))
            }
        };
    }
}

export const { forgotPassword } = ForgetApi;
