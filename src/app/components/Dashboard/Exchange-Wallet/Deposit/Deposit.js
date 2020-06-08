import React, {Component} from 'react';
import './Deposit.css';

export class Deposit extends Component {
  render() {
    const Profile = this.props.heading;

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{Profile}</h4>
          <p className="preferences_account">
            WALLET / <span>{Profile.toUpperCase()}</span>
          </p>
          <div className="deposit_address">
            <h3>Your BTC Deposit Address is:</h3>
            <button className="deposit_button">
              Could not get new address!
            </button>
          </div>
        </div>
        <div className="row account_detail withdrawalcontainer">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">Deposit</h4>
            </div>
            <div className="clear-fix" />
            <div className="table-responsive">
              <table className="table balances_table table-striped dashboard_table">
                <tbody>
                  <tr>
                    <th>Deposit</th>
                    <th>Deposit History</th>
                    {/* <th>Amount</th>
                    <th>Status</th>
                    <th>Tx Info</th> */}
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Deposit;
