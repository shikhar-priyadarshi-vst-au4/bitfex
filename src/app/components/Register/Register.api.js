import API from '../../redux_store/config';
import { register, setErrors } from './Register.action';

class RegisterApi {
    constructor() { }
    static registerUser = (userForm) => {
        console.log(userForm);
        return async dispatch => {
            try {
                let response = await API.post(`/users/sign_up`, userForm);
                dispatch(register(response.data));
            }
            catch (error) {

                dispatch(setErrors(error));
            }
        }
    }
}

export const { registerUser } = RegisterApi;


// export const registerUser = (userForm) => {
//     console.log(userForm);
//     return async dispatch => {
//         try {
//             let response = await API.post(`/users/sign_up`, userForm);
//             dispatch(register(response.data));
//         }
//         catch (error) {

//             dispatch(setErrors(error));
//         }
//     }
// }
