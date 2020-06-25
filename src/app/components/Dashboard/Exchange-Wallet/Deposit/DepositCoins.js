import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import QRCode from 'qrcode.react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';

import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

class DepositCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btcQrCode: '0x8dABb43a909b6816Ee22aD3a6444C9dD29Bf84Bf',
      usdtQrcode: '332NovkjmCGDiN4iD7QzsQjQb81LXvXznv',
      copied: false,
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

  setLoction = (e) => {
    this.props.history.push(`${e.value}`);
  };

  copyToClipboard = () => {
    this.hideCopyMessage();
    this.setState({copied: true});
  };

  hideCopyMessage() {
    this.timer = setTimeout(() => {
      this.defaultPosition();
    }, 2000);
  }

  defaultPosition() {
    clearTimeout(this.timer);
    this.setState({copied: false});
  }

  render() {
    const {heading, name, routes, location} = this.props;
    const BTC = routes[1].layout + routes[1].path;
    const USDT = routes[2].layout + routes[2].path;

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
      note: {
        marginTop: '20px',
        color: 'black',
      },
      ullist: {
        fontSize: '14px',
        display: 'list-item',
        listStyleType: 'circle',
        marginLeft: '20px',
        color: 'black',
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
            EXCHANGE WALLET / DEPOSIT /<span>{heading.toUpperCase()}</span>
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
              <div className="col-md-4" style={styles.qrCode}>
                <QRCode
                  size={200}
                  value={
                    location.pathname === USDT
                      ? this.state.usdtQrcode
                      : location.pathname === BTC
                      ? this.state.btcQrCode
                      : null
                  }
                />
              </div>
              <div className="col-md-8">
                <p style={styles.heading}>
                  YOUR WALLET ADDRESS TO RECEIVE {name} COINS
                </p>
                <div style={styles.addressdiv}>
                  <p style={styles.address}>
                    {location.pathname === USDT
                      ? this.state.usdtQrcode
                      : location.pathname === BTC
                      ? this.state.btcQrCode
                      : null}
                    &nbsp;&nbsp;
                    <CopyToClipboard
                      onCopy={this.copyToClipboard}
                      text={
                        location.pathname === USDT
                          ? this.state.usdtQrcode
                          : location.pathname === BTC
                          ? this.state.btcQrCode
                          : null
                      }
                    >
                      {this.state.copied ? (
                        <span style={{color: 'green'}}>Copied.</span>
                      ) : (
                        <button
                          className="fontbutton"
                          style={styles.fontbutton}
                        >
                          <span>
                            <FontAwesomeIcon
                              className="fontclass"
                              icon={faCopy}
                              style={styles.fontclass}
                            />{' '}
                            Copy
                          </span>
                        </button>
                      )}
                    </CopyToClipboard>
                  </p>
                </div>
                <div className="note" style={styles.note}>
                  <p>Note:</p>
                  <ul className="" style={styles.ullist}>
                    <li>
                      Only 2 blockchain confirmations are required for a
                      successful deposit
                    </li>
                    <li>
                      You can track the deposit progress in the wallet history
                      section.
                    </li>
                    <li>Do not deposit any other token to this address</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
          <div className="col-md-3" style={styles.blacontainer}>
            <p style={styles.blaheading}>{name} Balance Details</p>
            <table className="">
              <tbody>
                <tr>
                  <td style={styles.tdstyle}>Total</td>
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
                <tr>
                  <td style={styles.tdstyle}>In Order</td>
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
                <tr>
                  <td style={styles.tdstyle}>Available</td>
                  <td style={styles.tdstyle}>0.00000000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row account_detail withdrawalcontainer">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">{name} Deposit History</h4>
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

DepositCoins.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(DepositCoins));
