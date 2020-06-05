import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Bitfixlogo from '../../../../assets/img/Bitfex-logo.svg';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default main-navbar dashboard_header">
        <div className="container-fluid">
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
            <a className="navbar-brand" href="#">
              <img src={Bitfixlogo} className="logo_img" />
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav dashboard_list">
              <li className>
                <a href="#">Trade</a>
              </li>
              <li className>
                <a href="dashboard.html">Account</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right right_list">
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle" />
                </a>
                <ul className="dropdown-menu right_logout">
                  <p className="user_email">anil.kumar@stigasoft.com</p>
                  <p className="user_logout">
                    <a href="#">
                      <i className="fa fa-sign-out-alt" />
                      Log Out
                    </a>
                  </p>
                  <div></div>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
