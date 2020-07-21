import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import './Withdraw.css';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

export class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    console.log(this.props);
    const {heading, routes} = this.props;

    const BTC = routes[6].layout + routes[6].path;
    const USDT = routes[7].layout + routes[7].path;

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
        marginBottom: '18px',
      },
      btn: {
        fontSize: '18px',
        border: '1px solid grey',
        width: '276px',
        height: '70px',
        backgroundColor: 'white',
        boxShadow: '1 3px 7px -1px rgba(1,1,1,.4)',
        borderRadius: '6px',
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
                  className="btn btn-default bitcion_button"
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
                  className="btn btn-default bitcion_button"
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
          <div className="row dropdown" style={styles.select}>
            <div className="col-md-6">
              <Select options={options} onChange={this.setLoction} />
            </div>
            <div className="col-md-6" />
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
                        <img
                          src={Tether}
                          alt="Tether"
                          style={{height: '22px'}}
                        />
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
      </div>
    );
  }
}

Withdraw.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Withdraw);
