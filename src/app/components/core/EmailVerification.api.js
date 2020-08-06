import API from '../../redux_store/config';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, setErrors, sendEmail } from './EmailVerification.action';


class EmailVerifyApi {
    constructor() { }
    static confirmUserCode(userEmail, code) {
        return async dispatch => {
            try {
                let response = await API.get(`/users/confirm?email=${userEmail}&token=${code}`);
                const { jwt, email, first_name, last_name } = response.data;
                localStorage.setItem('token', jwt);
                const decoded = jwt_decode(jwt);
                dispatch(setCurrentUser(decoded));
            }
            catch (error) {
                console.log("ERROR", error);
                dispatch(setErrors(error))
            }
        }
    }
    static sendEMail(email, category) {
        return async dispatch => {
            try {
                let response = await API.get(`/users/send_email?email=${email}&category=${category}`);
                dispatch(sendEmail(response.data))
            }
            catch (error) {
                dispatch(setErrors(error))
            }
        }
    }
}

export const { confirmUserCode, sendEMail } = EmailVerifyApi;

