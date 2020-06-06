import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import HomePage from '../home-page/HomePageContent';
import BfxPage from '../bfx/BfxContent';
import InfoPage from '../info/InfoPage';
import RegisterContent from '../register/RegisterContent';
import LoginContent from '../login/LoginContent';
import ForgotPasswordContent from '../ForgotPassContent/ForgotPasswordContent';
import ResetPassContent from '../ResetPasswordContent/ResetPassContent';
import Dashboard from '../../components/Dashboard/Dashboard';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/bfx" component={BfxPage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/register" component={RegisterContent} />
          <Route path="/login" component={LoginContent} />
          <Route path="/forgot" component={ForgotPasswordContent} />
          <Route path="/resetPassword" component={ResetPassContent} />
          <Route path="/dashboard/account" component={Dashboard} />
          <Route path="/dashboard/security" component={Dashboard} />
          <Route path="/dashboard/affiliate" component={Dashboard} />
          <Route path="/dashboard/apiSecret" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
