import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Header extends Component {
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
          <div className="header-rt d-none d-md-flex ml-auto">
            <ul className="header-margins">
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
            </ul>
            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Equity</span>
              <span className="value">5.0467</span>
            </div>
            <div className="equity d-flex flex-column align-items-center">
              <span className="head">Available</span>
              <span className="value">5.0467</span>
            </div>
          </div>
          <div className="header-profile">
            <img src={'db-assets/user-icon.svg'} alt="user" />
          </div>
        </header>
      </>
    );
  }
}

export default withRouter(Header);
