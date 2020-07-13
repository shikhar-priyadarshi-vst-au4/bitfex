import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import PrivateRoute from '../../common/PrivateRoute';
import {getCurrentProfile} from '../../redux/actions/profileActions';
import {googletwofakey} from '../../redux/actions/apiSecretand2faAction';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/index';
import Footer from '../Footer/index';
import routes from './routes';
import setAuthToken from '../../utils/setAuthToken';
import './Dashboard.css';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component {...props} {...prop} routes={routes} />
            )}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
    if (this.props.auth.isAuthenticated) {
      setAuthToken(localStorage.getItem('token'));
      this.props.getCurrentProfile();
      this.props.googletwofakey();
    }
  }

  componentDidUpdate = () => {
    this.checkLoginStatus();
  };

  checkLoginStatus = () => {
    if (this.props.auth.isAuthenticated) {
      document.title = this.props.profile.profile.email;
    } else if (this.props.auth.user.email === null) {
      document.title = 'Bitfex';
    }
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  };

  render() {
    // console.log(this.props.profile.profile);
    // console.log(this.props);

    return (
      <div className="dashboard_body">
        <Header />
        <div className="row dashboard_container dashboard_maincontainer">
          <div className="col-md-2 sidebar_container">
            <Sidebar routes={routes} color={this.state.color} />
          </div>
          <div className="col-md-10 contentcontainer">
            <div className="wallet_container">{switchRoutes}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  googletwofakey: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  googletwofakey,
})(Dashboard);
