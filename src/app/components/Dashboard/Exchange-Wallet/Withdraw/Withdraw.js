import React, {Component} from 'react';
import './Withdraw.css';

export class Withdraw extends Component {
  render() {
    return (
      <div className="col-md-10 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">Withdraw BTC</h4>
          <p className="preferences_account">
            WALLET / <span>WITHDRAW BTC</span>
          </p>
          <div className="deposit_address">
            <p className="withdrawal">
              Please enable google two factor authentication for withdrawal!
            </p>
          </div>
        </div>
        <div className="row account_detail withdrawalcontainer">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">Withdrawal History</h4>
            </div>
            <div className="clear-fix" />
            <div className="table-responsive">
              <table
                className="table balances_table table-striped dashboard_table table-sm"
                id="dtHorizontalExample"
                cellSpacing={0}
                width="100%"
              >
                <tbody>
                  <tr>
                    <th className="created">Withdraw</th>
                    <th className="modified">Withdrawl History</th>
                    {/* <th className="amount">Amount</th>
              <th className="tablefee">Fee</th>
              <th className="tableaddress">Address</th>
              <th className="statustable">Status</th>
              <th className="txinfo">Tx Info</th> */}
                  </tr>
                  <tr>
                    <td>2020-01-02 16:54:43</td>
                    <td>
                      <i className="fa fa-btc" aria-hidden="true" /> 0.01000000
                    </td>
                    <td>0.0010</td>
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

export default Withdraw;
