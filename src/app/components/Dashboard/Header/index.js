import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../../redux/actions/authActions';
import _ from 'lodash';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutMenuOpen: false,
    };
  }

  componentDidMount = () => {
    console.log(this.props);
  };

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(nextProps.profile, this.props.profile)) {
      this.forceUpdate();
    }
  };

  componentDidUpdate = () => {
    console.log(this.props);
  };

  bodyClickListener = () => {
    document.body.addEventListener('click', () => {
      this.setState({logoutMenuOpen: false});
    });
  };

  toggleLogoutMenu = (e) => {
    e.stopPropagation();
    this.setState((p) => ({logoutMenuOpen: !p.logoutMenuOpen}));
  };

  render() {
    return (
      <>
        <header className="a5-header d-flex p-4 align-items-center">
          <div
            onClick={() => {
              this.props.toggleSidebar();
            }}
            className="menu-trigger mr-4"
          >
            <img src={'db-assets/menu-icon.svg'} alt="menu" />
          </div>
          <div
            onClick={() => {
              this.props.history.push('/');
            }}
            className="logo"
          >
            <img src={'db-assets/a5-white-header-logo.svg'} alt="Alpha5" />
          </div>
          <div className="header-left d-none d-md-flex mr-auto">
            <a href="/trade/">Trade</a>
            <a href="/site/API">Resources</a>
          </div>
          <div className="header-rt d-none d-md-flex ml-auto">
            {/* <ul className="header-margins">
              <li>
                <span className="head">IM</span>
                <span className="bar">
                  <span className="bar-value"></span>
                </span>
                <span className="value">25%</span>
              </li>
              <li>
                <span className="head">MM</span>
                <span className="bar">
                  <span className="bar-value"></span>
                </span>
                <span className="value">25%</span>
              </li>
            </ul> */}
            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Equity</span>
              <span className="value">5.0467</span>
            </div>
            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Available</span>
              <span className="value">5.0467</span>
            </div>
          </div>
          <div onClick={this.toggleLogoutMenu} className="header-profile">
            <img src={'db-assets/user-icon.svg'} alt="user" />
            <div
              className={`header-profile-menu  ${
                this.state.logoutMenuOpen ? 'd-block' : 'd-none'
              }`}
            >
              <h3>{this.props.profile.profile.email}</h3>

              <div className="header-rt-menu-item d-flex d-md-none header-rt-menu-equity">
                <span className="head">Equity</span>
                <span className="value">5.0467</span>
              </div>
              <div className="header-rt-menu-item d-flex d-md-none header-rt-menu-equity">
                <span className="head">Available</span>
                <span className="value">5.0467</span>
              </div>
              <div className="header-rt-menu-item d-flex d-md-none header-rt-menu-links">
                <a href="/trade/">Trade</a>
                <a href="/site/API">Resources</a>
              </div>
              <div onClick={this.props.logoutUser} className={`header-logout`}>
                <span>Logout</span>
                <span style={{marginLeft: '0.4rem'}}>
                  <i className="fa fa-sign-out"></i>
                </span>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Header));
