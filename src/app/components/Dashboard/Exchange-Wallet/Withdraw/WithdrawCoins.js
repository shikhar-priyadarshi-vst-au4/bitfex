import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';

import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

class WithdrawCoins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funds: '',
      balance: '5.00000000',
      minthdrawal: '',
      address: '',
    };
  }

  componentDidMount() {
    // this.props.setCurrentUser();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
      document.title = 'Bitfex';
    }
  }

  getAmountChange = (e) => {
    const {balance, minthdrawal} = this.state;
    if (balance < e.target.value) {
      this.setState({funds: 'Insufficient funds'});
    } else if (e.target.value === '') {
      this.setState({
        funds: `Min Withdrawal Amount is 0.001 ${this.props.name}`,
      });
    }
  };

  setLoction = (e) => {
    this.props.history.push(`${e.value}`);
  };

  forSucessAddress = (e) => {
    console.log(e.target.value);
    this.setState({address: e.target.value});
  };

  render() {
    console.log(this.state.address);
    const {heading, name, routes, location} = this.props;
    const BTC = routes[6].layout + routes[6].path;
    const USDT = routes[7].layout + routes[7].path;
    const btcAdrress = routes[4].layout + routes[4].path;
    const usdtAdress = routes[5].layout + routes[5].path;

    console.log(this.props);

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
        backgroundColor: 'white',
        padding: '7px',
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
        width: '140px',
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
                  onChange={this.setLoction}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={styles.qrCode}>
                <input
                  type="text"
                  placeholder="Address"
                  style={styles.adressInput}
                  onChange={this.forSucessAddress}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8" style={styles.amountdiv}>
                <input
                  type="text"
                  placeholder="Amount"
                  style={styles.amountInput}
                  onChange={this.getAmountChange}
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
                <Link
                  to={
                    location.pathname === BTC
                      ? btcAdrress
                      : location.pathname === USDT
                      ? usdtAdress
                      : null
                  }
                >
                  <button style={styles.sendBtn}>SEND</button>
                </Link>
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
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
                <tr>
                  <td style={styles.tdstyle}>In Order</td>
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
                <tr>
                  <td style={styles.tdstyle}>Available Balance</td>
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

WithdrawCoins.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(WithdrawCoins));
