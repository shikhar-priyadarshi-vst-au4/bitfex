import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';

import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

class WithdraSuccessAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.profile,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({profile: nextProps.profile});
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
      googlediv: {
        marginTop: '20px',
        marginBottom: '20px',
      },
      heading: {
        marginTop: '20px',
        color: 'black',
      },
      googlecodeInput: {
        width: '100%',
        height: '33px',
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
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
      googlespan: {
        color: 'black',
      },
      emaildiv: {
        marginBottom: '20px',
      },
    };

    const {profile} = this.state;
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
              <div className="col-md-12" style={styles.googlediv}>
                <input
                  type="text"
                  placeholder="Google Verification Code"
                  style={styles.googlecodeInput}
                />
                <span style={styles.googlespan}>
                  Enter the 6 digit code from Google Authenticator
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={styles.emaildiv}>
                <input
                  type="text"
                  placeholder="Email Verification Code"
                  style={styles.googlecodeInput}
                />
                <span style={styles.googlespan}>
                  Enter the 6 digit code recevied by {profile.profile.email}
                </span>
              </div>
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
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

WithdraSuccessAddress.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {})(WithdraSuccessAddress);
