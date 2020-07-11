import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import {logoutUser} from '../../../redux/actions/authActions';
import {
  clearCurrentProfile,
  getCurrentProfile,
} from '../../../redux/actions/profileActions';
import './Header.css';
import Bitfixlogo from '../../../../assets/img/Bitfex-logo.svg';

class Header extends Component {
  componentDidMount = () => {
    // console.log(this.props);
  };

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(nextProps.profile, this.props.profile)) {
      this.forceUpdate();
    }
  };

  componentDidUpdate = () => {
    // console.log(this.props);
  };

  Logout = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    // console.log(this.props.auth.user.email);
    return (
      <nav className="navbar navbar-default main-navbar dashboard_header">
        <div className="container-fluid nopadd">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            {/* <a className="navbar-brand" href="#">
              <img src={Bitfixlogo} className="logo_img" />
            </a> */}
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <a className="navbar-brand" href="#">
              <img src={Bitfixlogo} className="logo_img" />
            </a>
            <ul className="nav navbar-nav dashboard_list">
              <li className="true">
                <a role="button">Trade</a>
              </li>
              <li className="true">
                <a role="button" className="account_header">
                  Account
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right right_list">
              <li className="dropdown">
                <a
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle"></i>
                </a>
                <ul className=" right_logout">
                  <p className="user_email">
                    {this.props.profile.profile.email}
                  </p>
                  <p className="user_logout">
                    <a className="#" onClick={this.Logout}>
                      <i className="fa fa-sign-out"></i>Log Out
                    </a>
                  </p>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
})(Header);
