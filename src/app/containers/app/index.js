import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import PrivateRoute from '../../common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import store from '../../redux/store';

// import setAuthToken from '../../utils/setAuthToken';
import {setCurrentUser, logoutUser} from '../../redux/actions/authActions';

import HomePage from '../home-page/HomePageContent';
import BfxPage from '../bfx/BfxContent';
import InfoPage from '../info/InfoPage';
import RegisterContent from '../register/RegisterContent';
import LoginContent from '../login/LoginContent';
import ForgotPasswordContent from '../ForgotPassContent/ForgotPasswordContent';
import ResetPassContent from '../ResetPasswordContent/ResetPassContent';
import Dashboard from '../../components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/bfx" component={BfxPage} />
            <Route path="/info" component={InfoPage} />
            <Route path="/register" component={RegisterContent} />
            <Route path="/login" component={LoginContent} />
            <Route path="/forgot" component={ForgotPasswordContent} />
            <Route path="/resetPassword" component={ResetPassContent} />
            <Route
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
