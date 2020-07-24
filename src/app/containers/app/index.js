import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import HomePage from '../home-page/HomePageContent';
import RegisterContent from '../register/RegisterContent';
import LoginContent from '../login/LoginContent';
import Dashboard from '../../components/Dashboard/Dashboard';
import ForgotPassword from '../ForgotPassContent/ForgotPasswordContent';
import ResetPassword from '../reset-password-form/reset-password-form-content';
import {Provider} from 'react-redux';
import store from '../../redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={RegisterContent} />
            <Route path="/login" component={LoginContent} />
            <Route path="/reset-password" component={ForgotPassword} />
            <Route path="/password-change" component={ResetPassword} />
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
