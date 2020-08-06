import jwt_decode from 'jwt-decode';

import API from '../../redux_store/config';

import { loginSuccess, setCurrentUser, setErrors } from './Login.action';

class LoginApi {

    static loginUser(emailid, password, token_2fa) {
        return async (dispatch) => {
            try {
                const response = await API.post(`/users/sign_in`, { email: emailid, password, token_2fa })
                console.log(response);
                const { jwt, email, first_name, last_name } = response.data;
                dispatch(loginSuccess(response.data));
                localStorage.setItem("token", jwt);
                const decoded = jwt_decode(jwt);
                dispatch(setCurrentUser({ decoded, email, first_name, last_name }));
            }
            catch (error) {
                console.log("errors", JSON.stringify(error));
                dispatch(setErrors(error))
            }
        }
    }
}

export const { loginUser } = LoginApi;








// .then((res) => {
//     // Save to localStorage
//     const {jwt, email, first_name, last_name} = res.data;
//     dispatch({
//       type: LOGIN_DATA,
//       payload: res.data,
//     });
//     if (jwt != undefined) {
//       // Set token to ls
//       localStorage.setItem('token', jwt);
//       // Set token to Auth header
//       setAuthToken(jwt);
//       // Decode token to get user data
//       const decoded = jwt_decode(jwt);
//       // Set current user
//       dispatch(setCurrentUser(decoded, email, first_name, last_name));
//       window.location.reload();
//     }
//   })
//   .catch((error) =>
//     dispatch({
//       type: GET_ERRORS,
//       payload: ((error || {}).response || {}).data || 'Error unexpected',
//     }),
//   );
// };
