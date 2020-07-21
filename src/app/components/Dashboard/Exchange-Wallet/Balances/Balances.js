import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInr, faHistory} from '@fortawesome/free-solid-svg-icons';
import './Balances.css';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

class Balances extends Component {
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

  render() {
    const {heading, routes} = this.props;

    const Depositroute = routes[3].layout + routes[3].path;
    const withdrawroute = routes[8].layout + routes[8].path;

    const styles = {
      newelementrow: {
        marginTop: '15px',
      },
      select: {
        marginTop: '20px',
      },
      linkbtn: {
        color: 'white',
        fontSize: '14px',
        backgroundColor: '#f18d05',
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
          <p className=""></p>
          <div className="row account_detail">
            <div className="col-md-12 balance_container">
              <div className="">
                <h4 className="account_tableheading">Balances</h4>
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
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={Bitcoin}
                          alt="Bitcoin"
                          style={{height: '22px'}}
                        />
                        &nbsp; BTC
                      </td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                      <td>
                        <Link to={Depositroute}>
                          <button
                            type="button"
                            className="btn btn-default"
                            style={styles.linkbtn}
                          >
                            Deposit
                          </button>
                        </Link>
                        &nbsp;
                        <Link to={withdrawroute}>
                          <button
                            type="button"
                            className="btn btn-default"
                            style={styles.linkbtn}
                          >
                            Withdraw
                          </button>
                        </Link>
                        {/* &nbsp;
                        <Link to="">
                          <button
                            type="button"
                            className="btn btn-default"
                            style={styles.linkbtn}
                          >
                            Trade
                          </button>
                        </Link> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={Tether}
                          alt="Tether"
                          style={{height: '22px'}}
                        />
                        &nbsp; USDT
                      </td>
                      <td>-0.05166684</td>
                      <td>0.00020265</td>
                      <td>100000.53173519</td>
                      <td>
                        <Link to={Depositroute}>
                          <button
                            type="button"
                            className="btn btn-default"
                            style={styles.linkbtn}
                          >
                            Deposit
                          </button>
                        </Link>
                        &nbsp;
                        <Link to={withdrawroute}>
                          <button
                            type="button"
                            className="btn btn-default"
                            style={styles.linkbtn}
                          >
                            Withdraw
                          </button>
                        </Link>
                        {/* &nbsp;
                        <Link to="">
                          <button
                            type="button"
                            className="btn btn-default"
                            style={styles.linkbtn}
                          >
                            Trade
                          </button>
                        </Link> */}
                      </td>
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

Balances.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Balances);
