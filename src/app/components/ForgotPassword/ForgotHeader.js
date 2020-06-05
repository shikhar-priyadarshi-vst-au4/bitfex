import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Bitfixlogo from '../../../assets/img/Bitfex-logo.svg';
export class ForgotHeader extends Component {
  render() {
    return (
      <header className="landing-header">
        <div className="landing-header-container d-flex">
          <div className="landing-header-logo">
            <a href="#">
              <img src={Bitfixlogo} />
            </a>
          </div>
          <div className="menu-trigger">
            {' '}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="mob-menu-container">
            <div className="close-icon">
              <span></span>
              <span></span>
            </div>
            <div className="header-right d-flex flex-wrap">
              {/* <div className="login-links d-flex">
                <Link className="register-btn" to="/register">
                  Register
                </Link>
                <Link
                  className="register-btn"
                  to="/login"
                  style={{marginLeft: '5px'}}
                >
                  Login
                </Link>
              </div> */}
            </div>
            <div className="menu-container">
              <ul>
                <li>
                  <a href="#" target="_blank">
                    Documentation
                  </a>
                </li>
                <li>
                  <Link style={{cursor: 'pointer'}} to="/bfx">
                    BFX
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*Menu Open Overlay*/}
        <div className="menu-overlay"></div>
      </header>
    );
  }
}

export default ForgotHeader;
