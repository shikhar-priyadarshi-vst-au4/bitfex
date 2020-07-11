import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';

import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

class WithdraWrongAddress extends Component {
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
      newelementrow: {
        marginTop: '15px',
      },
      faliurMsgrow: {
        marginTop: '20px',
      },
      faliurMsg: {
        color: 'red',
      },
      startagainbtn: {
        height: '37px',
        width: '105px',
        marginLeft: '15px',
      },
    };
    console.log(this.props);

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{heading}</h4>
          <p className="preferences_account">
            EXCHANGE WALLET / <span>{heading.toUpperCase()}</span>/{' '}
            <span>{name.toUpperCase()}</span>
          </p>
          <div className="row select-button" style={styles.newelementrow}>
            <div className="col-md-8">
              <Select
                options={options}
                defaultValue={
                  location.pathname === USDT
                    ? options[1]
                    : location.pathname === BTC
                    ? options[0]
                    : null
                }
              />
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row dropdown" style={styles.faliurMsgrow}>
            <div className="col-md-8">
              <h3 style={styles.faliurMsg}>Failure- invalid Address</h3>
              <p>
                For keeping your funds safe, withdrawls will not be allowed for
                24hrs post changing the security credentils.
              </p>
              <p>For more questions please contact support</p>
            </div>
            <div className="col-md-4" />
          </div>
          <div className="row">
            <div className="com-md-6">
              <Link
                to={
                  location.pathname === BTC
                    ? routes[6].layout + routes[6].path
                    : location.pathname === USDT
                    ? routes[7].layout + routes[7].path
                    : null
                }
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  style={styles.startagainbtn}
                >
                  START AGAIN
                </button>
              </Link>
            </div>
            <div className="com-md-6"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithdraWrongAddress;
