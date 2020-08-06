import API from '../../redux_store/config';
import { setResetPassword, setErrors } from './ResetPassword.action';


class ResetPasswordApi {
    static resetPassword = (passowrdInfo) => async (dispatch) => {
        try {
            const response = await API.post(`/users/reset_password`, passowrdInfo);
            dispatch(setResetPassword(response.data));
        }
        catch (error) {
            dispatch(setErrors(error));
        }
    };
}


export const { resetPassword } = ResetPasswordApi;
