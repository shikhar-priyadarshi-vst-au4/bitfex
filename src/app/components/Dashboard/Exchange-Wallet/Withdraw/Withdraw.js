import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Select from 'react-select';
import './Withdraw.css';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

export class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.props.history.push(`${e.value}`);
  };

  render() {
    const {heading, routes} = this.props;

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
      select: {
        marginTop: '20px',
      },
      btn: {
        fontSize: '14px',
        border: '1px solid grey',
        width: '230px',
        height: '70px',
        backgroundColor: 'white',
        boxShadow: '1 3px 7px -1px rgba(1,1,1,.4)',
      },
      img: {
        height: '35px',
        marginLeft: '-70px',
      },
    };
    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{heading}</h4>
          <p className="preferences_account">
            EXCHANGE WALLET / <span>{heading.toUpperCase()}</span>
          </p>
          <div className="row select-button" style={styles.newelementrow}>
            <div className="col-md-7">
              <Link to={BTC}>
                <button
                  type="button"
                  className="btn btn-default"
                  style={styles.btn}
                >
                  <img src={Bitcoin} alt="Bitcoin" style={styles.img} />
                  &nbsp; Bitcoin &nbsp;
                  <span>Avl: 0</span>
                </button>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={USDT}>
                <button
                  type="button"
                  className="btn btn-default"
                  style={styles.btn}
                >
                  <img src={Tether} alt="Tether" style={styles.img} />
                  &nbsp; Tether &nbsp;
                  <span>Avl: 0</span>
                </button>
              </Link>
            </div>
            <div className="col-md-5" />
          </div>
          <div className="row dropdown">
            <div className="col-md-6" style={styles.select}>
              <Select options={options} onChange={this.onChange} />
            </div>
            <div className="col-md-6" />
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
                    <th className="created">Assets</th>
                    <th className="created">Withdraw</th>
                    <th className="modified">Withdrawl History</th>
                  </tr>
                  <tr>
                    <td>
                      {' '}
                      <img
                        src={Bitcoin}
                        alt="Bitcoin"
                        style={{height: '22px'}}
                      />{' '}
                      &nbsp; BTC{' '}
                    </td>
                    <td>0.000</td>
                    <td>0.000</td>
                  </tr>
                  <tr>
                    <td>
                      {' '}
                      <img src={Tether} alt="Tether" style={{height: '22px'}} />
                      &nbsp; USDT
                    </td>
                    <td>0.000</td>
                    <td>0.000</td>
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
