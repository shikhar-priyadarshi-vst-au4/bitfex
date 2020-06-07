import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWallet, faUser, faHistory} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const currentState = this.state.active;
    this.setState({
      active: !currentState,
    });
  }

  render() {
    const {color, routes} = this.props;
    const show = this.state.active ? 'show' : '';
    return (
      <div className="account_menu">
        <ul className="nav navbar-nav sidebar_nav">
          <li className="nav-item subdrop sidedropdown ">
            <a
              className="nav-link"
              data-toggle="collapse"
              data-target="#walletsidebar"
              aria-expanded="true"
            >
              {/* <i className="fa fa-wallet icon-main" /> */}
              <FontAwesomeIcon
                icon={faWallet}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text"> Wallet</span>
              {/* <i class="fa fa-chevron-up up"></i> */}
              <i className="fa fa-chevron-down down" />
            </a>
            <ul
              id="walletsidebar"
              className="collapse sidebarlist show"
              style={{}}
            >
              <li className="nav-item">
                <a role="button" className="nav-link">
                  Balances
                </a>
              </li>
              <li className="nav-item">
                <a role="button" className="nav-link">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a role="button" className="nav-link">
                  Address
                </a>
              </li>
              <li className="nav-item">
                <a role="button" className="nav-link">
                  Withdraw
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item subdrop sidedropdown">
            <a
              className="nav-link collapsed"
              data-toggle="collapse"
              data-target="#accountsidebar"
              aria-expanded="true"
              role="button"
              onClick={this.handleClick}
            >
              {/* <i className="fa fa-user icon-main" /> */}
              <FontAwesomeIcon
                icon={faUser}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text">Account &amp; Preferences</span>
              {/* <i class="fa fa-chevron-up up"></i> */}
              <i
                className={
                  this.state.active
                    ? 'fa fa-chevron-down down'
                    : 'fa fa-chevron-right down'
                }
                onClick={this.handleClick}
                aria-hidden="true"
              />
            </a>
            <ul
              id="accountsidebar"
              className={`collapse sidebarlist ${show}`}
              style={{}}
            >
              {/* {routes.map((prop, key) => {
                // console.log(prop.layout);
                // console.log(prop.path);
                // console.log(key);
                return  (<NavLink to={prop.layout + prop.path} key={key}>
                  <li className="nav-item">{prop.name}</li>
                </NavLink>);
              })} */}

              <li className="nav-item active">
                <NavLink
                  to={routes[4].layout + routes[4].path}
                  className="nav-link"
                >
                  {routes[4].name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={routes[5].layout + routes[5].path}
                  className="nav-link"
                >
                  {routes[5].name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={routes[6].layout + routes[6].path}
                  className="nav-link"
                >
                  {routes[6].name}
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  to={routes[7].layout + routes[7].path}
                  className="nav-link"
                >
                  {routes[7].name}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item subdrop sidedropdown">
            <a
              className="nav-link"
              data-toggle="collapse"
              data-target="#historysidebar"
              aria-expanded="true"
            >
              {/* <i className="fa fa-history icon-main" aria-hidden="true" /> */}
              <FontAwesomeIcon
                icon={faHistory}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text">History</span>
              {/* <i class="fa fa-chevron-up up"></i> */}
              <i className="fa fa-chevron-down down" />
            </a>
            <ul
              id="historysidebar"
              className="collapse sidebarlist show"
              style={{}}
            >
              <li className="nav-item">
                <a className="nav-link" role="button">
                  Trade History
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" role="button">
                  Order History
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
