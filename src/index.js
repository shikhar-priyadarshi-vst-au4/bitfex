import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import store from './app/redux/store';

import setAuthToken from './app/utils/setAuthToken';
import {setCurrentUser, logoutUser} from './app/redux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './app/containers/app';
import * as serviceWorker from './serviceWorker';

// console.log(localStorage.token);
// // Check for token
// if (localStorage.token) {
//   // Set auth token header auth
//   setAuthToken(localStorage.token);
//   // Decode token and get user info and expo
//   const decoded = jwt_decode(localStorage.token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const Cureenttime = Date.now() / 1000;
//   if (decoded.exp < Cureenttime) {
//     // Logout user
//     store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = '/login';
//   }
// }

ReactDOM.render(<App />, document.getElementById('react-app'));
serviceWorker.unregister();
