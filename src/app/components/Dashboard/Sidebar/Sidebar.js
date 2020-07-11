import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faHistory,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Exchangewallet: true,
      AccPrefences: true,
      FuturesWallet: true,
      OptionsWallet: true,
      History: true,
    };
  }

  ExchangewalletClick = () => {
    const currentState = this.state.Exchangewallet;
    this.setState({
      Exchangewallet: !currentState,
    });
  };

  accPrefencesClick = () => {
    const currentState = this.state.AccPrefences;
    this.setState({
      AccPrefences: !currentState,
    });
  };

  FuturesWalletClick = () => {
    const currentState = this.state.FuturesWallet;
    this.setState({
      FuturesWallet: !currentState,
    });
  };

  OptionsWalletClick = () => {
    const currentState = this.state.OptionsWallet;
    this.setState({
      OptionsWallet: !currentState,
    });
  };

  HistoryClick = () => {
    const currentState = this.state.History;
    this.setState({
      History: !currentState,
    });
  };

  render() {
    const {color, routes} = this.props;
    // const show = this.state.active ? 'show' : '';
    // console.log(this.props);
    return (
      <div className="account_menu">
        <ul className="nav navbar-nav sidebar_nav">
          <li className="nav-item subdrop sidedropdown ">
            <a
              className="nav-link"
              data-toggle="collapse"
              data-target="#walletsidebar"
              aria-expanded="true"
              role="button"
              id="1"
              onClick={this.ExchangewalletClick}
            >
              <FontAwesomeIcon
                icon={faWallet}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text"> Exchange Wallet</span>
              <i
                className={
                  this.state.Exchangewallet
                    ? 'fa fa-chevron-down down'
                    : 'fa fa-chevron-right down'
                }
              />
            </a>
            <ul
              id="walletsidebar"
              className="collapse sidebarlist in"
              style={{}}
            >
              <li className="nav-item">
                <NavLink
                  to={routes[0].layout + routes[0].path}
                  className="nav-link"
                >
                  {routes[0].name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={{
                    pathname: routes[3].layout + routes[3].path,
                    routes,
                  }}
                  className="nav-link"
                >
                  {routes[3].name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={routes[8].layout + routes[8].path}
                  className="nav-link"
                >
                  {routes[8].name}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item subdrop sidedropdown">
            <a
              className="nav-link"
              data-toggle="collapse"
              data-target="#futuresidebar"
              aria-expanded="true"
              role="button"
              id="2"
              onClick={this.FuturesWalletClick}
            >
              <FontAwesomeIcon
                icon={faAngleDoubleUp}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text">Futures Wallet</span>
              <i
                className={
                  this.state.FuturesWallet
                    ? 'fa fa-chevron-down down'
                    : 'fa fa-chevron-right down'
                }
              />
            </a>
            <ul
              id="futuresidebar"
              className="collapse sidebarlist in"
              style={{}}
            >
              <li className="nav-item">
                <NavLink
                  to={routes[13].layout + routes[13].path}
                  className="nav-link"
                >
                  {routes[13].name}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item subdrop sidedropdown">
            <a
              className="nav-link"
              data-toggle="collapse"
              data-target="#optionssidebar"
              aria-expanded="true"
              role="button"
              id="3"
              onClick={this.OptionsWalletClick}
            >
              <i className="fa fa-line-chart" style={{width: '1.875em'}}></i>
              <span className="nav-link-text">Options Wallet</span>
              <i
                className={
                  this.state.OptionsWallet
                    ? 'fa fa-chevron-down down'
                    : 'fa fa-chevron-right down'
                }
              />
            </a>
            <ul
              id="optionssidebar"
              className="collapse sidebarlist in"
              style={{}}
            >
              <li className="nav-item">
                <NavLink
                  to={routes[14].layout + routes[14].path}
                  className="nav-link"
                >
                  {routes[14].name}
                </NavLink>
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
              id="4"
              onClick={this.accPrefencesClick}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text">Account &amp; Preferences</span>
              <i
                className={
                  this.state.AccPrefences
                    ? 'fa fa-chevron-down down'
                    : 'fa fa-chevron-right down'
                }
                aria-hidden="true"
              />
            </a>
            <ul
              id="accountsidebar"
              className={`collapse sidebarlist + in`}
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
                  to={routes[9].layout + routes[9].path}
                  className="nav-link"
                >
                  {routes[9].name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={routes[10].layout + routes[10].path}
                  className="nav-link"
                >
                  {routes[10].name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={routes[11].layout + routes[11].path}
                  className="nav-link"
                >
                  {routes[11].name}
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  to={routes[12].layout + routes[12].path}
                  className="nav-link"
                >
                  {routes[12].name}
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
              role="button"
              id="5"
              onClick={this.HistoryClick}
            >
              <FontAwesomeIcon
                icon={faHistory}
                className="icon-main"
                style={{width: '1.875em'}}
              />
              <span className="nav-link-text">History</span>
              <i
                className={
                  this.state.History
                    ? 'fa fa-chevron-down down'
                    : 'fa fa-chevron-right down'
                }
              />
            </a>
            <ul
              id="historysidebar"
              className="collapse sidebarlist in"
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
