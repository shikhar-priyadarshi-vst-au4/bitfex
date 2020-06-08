import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInr, faHistory} from '@fortawesome/free-solid-svg-icons';
import './Balances.css';

export class Balances extends Component {
  render() {
    const Profile = this.props.heading;

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{Profile}</h4>
          <p className="preferences_account">
            WALLET / <span>{Profile.toUpperCase()}</span>
          </p>
          <div className="values">
            <h2>Wallet Balance</h2>
            <p className="value title">
              <i className="fa fa-btc" aria-hidden="true" />
              &nbsp; 0.00
            </p>
          </div>
          <p className=""></p>
          <div className="row account_detail">
            <div className="col-md-12 balance_container">
              <div className="">
                <h4 className="account_tableheading">Balances</h4>
                <div className="entries_container">
                  <div className="balance_div">
                    <p className="entries">Show</p>
                    <ul className="nav entries">
                      <li className="dropdown">
                        <button
                          aria-expanded="false"
                          aria-haspopup="true"
                          role="button"
                          data-toggle="dropdown"
                          className="dropdown-toggle"
                          href="#"
                        >
                          <span id="selected">10</span>
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu number_listcontainer">
                          <li>
                            <a href="#">10</a>
                          </li>
                          <li>
                            <a href="#">25</a>
                          </li>
                          <li>
                            <a href="#">50</a>
                          </li>
                          <li>
                            <a href="#">100</a>
                          </li>
                          <div></div>
                        </ul>
                      </li>
                    </ul>
                    <p className="entries">Entries</p>
                  </div>
                  <div className="search_div">
                    <form action="/action_page.php">
                      <label htmlFor="fname">Search</label>
                      <input type="text" id="fname" name="fname" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="clear-fix" />
              <div className="table-responsive">
                <table className="table balances_table table-striped dashboard_table">
                  <tbody>
                    <tr>
                      <th>Asstet Type</th>
                      <th>Total Balance</th>
                      <th>Locked</th>
                      <th>Available Balance</th>
                    </tr>
                    <tr>
                      <td>100000.58319937</td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="page_of_page">
                <span className="onetoone">1 to 1 of 1</span>
                <span>
                  <span>
                    <i className="fa fa-chevron-left" />
                    <i className="fa fa-arrow-to-left" />
                  </span>
                  <span className="pageofpage">Page 1of 1</span>
                  <span>
                    <i className="fa fa-chevron-right" />
                    <i className="fa fa-arrow-to-right" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Balances;
