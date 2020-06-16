import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';

import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

class WithdrawCoins extends Component {
  constructor(props) {
    super(props);

    this.state = {funds: '', balance: '0.00000000', minthdrawal: ''};

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange = (e) => {
    const {balance, minthdrawal} = this.state;
    if (balance < e.target.value) {
      this.setState({funds: 'Insufficient funds'});
    } else if (e.target.value === '') {
      this.setState({
        funds: `Min Withdrawal Amount is 0.001 ${this.props.name}`,
      });
    }
  };

  onChange = (e) => {
    this.props.history.push(`${e.value}`);
  };

  render() {
    const {heading, name, routes, location} = this.props;
    const BTC = routes[4].layout + routes[4].path;
    const USDT = routes[5].layout + routes[5].path;

    const options = [
      {
        value: BTC,
        label: (
          <div>
            <img src={Bitcoin} alt="Bitcoin" style={{height: '22px'}} /> BTC{' '}
          </div>
        ),
      },
      {
        value: USDT,
        label: (
          <div>
            <img src={Tether} alt="Tether" style={{height: '22px'}} /> USDT{' '}
          </div>
        ),
      },
    ];

    const styles = {
      containerrow: {
        marginLeft: '16px',
      },
      container: {
        backgroundColor: '#aab3c0',
        width: '100%',
        height: '50%',
        marginBottom: '30px',
      },
      select: {
        marginTop: '20px',
      },
      qrCode: {
        marginTop: '20px',
        marginBottom: '20px',
      },
      heading: {
        marginTop: '20px',
        color: 'black',
      },
      addressdiv: {
        backgroundColor: 'white',
        border: '1px thin grey',
        borderRadius: '3px',
        height: '45px',
      },
      address: {
        padding: '12px',
        marginLeft: '30px',
      },
      fontbutton: {
        border: 'none',
        backgroundColor: 'white',
      },
      fontclass: {
        fontSize: '18px',
        color: '#00afff',
      },
      adressInput: {
        width: '100%',
        height: '33px',
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
      },
      amountInput: {
        width: '100%',
        height: '33px',
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
      },
      avBlanceInput: {
        width: '100%',
        height: '33px',
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
      },
      amountdiv: {
        marginBottom: '20px',
      },
      sendBtn: {
        width: '100%',
        height: '33px',
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
        backgroundColor: '#f44242',
        color: 'white',
      },
      note: {
        color: 'black',
      },
      ullist: {
        fontSize: '14px',
        display: 'list-item',
        listStyleType: 'circle',
        marginLeft: '20px',
        color: 'black',
      },
      errdiv: {
        height: '40px',
      },
      errmsg: {
        marginLeft: '20px',
        color: 'red',
      },
      blacontainer: {
        width: '100%',
        height: '50%',
        marginBottom: '30px',
      },
      tdstyle: {
        color: 'black',
        paddingBottom: '11px',
      },
      blaheading: {
        fontSize: '19px',
        color: 'black',
      },
    };

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{heading}</h4>
          <p className="preferences_account">
            EXCHANGE WALLET / WITHDRAW /<span>{heading.toUpperCase()}</span>
          </p>
          {/* <div className="deposit_address">
        <h3>Your BTC Deposit Address is:</h3>
        <button className="deposit_button">
          Could not get new address!
        </button>
      </div> */}
        </div>
        <div className="row" style={styles.containerrow}>
          <div className="col-md-8" style={styles.container}>
            <div className="row">
              <div className="col-md-12" style={styles.select}>
                <Select
                  options={options}
                  defaultValue={
                    location.pathname === USDT
                      ? options[1]
                      : location.pathname === BTC
                      ? options[0]
                      : null
                  }
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={styles.qrCode}>
                <input
                  type="text"
                  placeholder="Address"
                  style={styles.adressInput}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8" style={styles.amountdiv}>
                <input
                  type="text"
                  placeholder="Amount"
                  style={styles.amountInput}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-4">
                <div
                  style={styles.avBlanceInput}
                >{`Available: ${this.state.balance} ${name}`}</div>
              </div>
            </div>
            <div className="row fee-balance-wrapper">
              <span className="" style={styles.errmsg}>
                {this.state.funds}
              </span>
            </div>
            <div className="row" style={styles.errdiv}>
              <div className="col-md-12">
                <button style={styles.sendBtn}>SEND</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={styles.note}>
                <p>Note:</p>
                <ul className="" style={styles.ullist}>
                  <li>
                    Please verify your email after successfully submitting the
                    withdrawal request
                  </li>
                  <li>
                    You can track the withdrawal progress in the transaction
                    history section
                  </li>
                  <li>
                    Please do not withdraw this token to any ICO address
                    directly
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
          <div className="col-md-3" style={styles.blacontainer}>
            <p style={styles.blaheading}>{name} Funds Details</p>
            <table className="">
              <tbody>
                <tr>
                  <td style={styles.tdstyle}>Total Balance</td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
                <tr>
                  <td style={styles.tdstyle}>In Order</td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
                <tr>
                  <td style={styles.tdstyle}>Available Balance</td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row account_detail withdrawalcontainer">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">{name} Withdraw History</h4>
            </div>
            <div className="clear-fix" />
            <div className="table-responsive">
              <table className="table balances_table table-striped dashboard_table">
                <tbody>
                  <tr>
                    <th>QUANTITY</th>
                    <th>DATE</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>13 June 2020</td>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>12 June 2020</td>
                    <td>10000</td>
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

export default withRouter(WithdrawCoins);
