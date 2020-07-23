import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';

// import setAuthToken from './app/utils/setAuthToken';
import {setCurrentUser, logoutUser} from './app/redux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './app/containers/app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('react-app'));
serviceWorker.unregister();
