import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import AlertDismissible from '../../Alert/GoogleAuth';
import './Deposit.css';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

export class Deposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleAuth: false,
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

  // chekGoogleAuth = (e) => {
  //   <AlertDismissible />;
  // };

  render() {
    const {heading, routes} = this.props;

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
    // const alertData = (
    //   <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    //     <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
    //     <p>
    //       Change this and that and try again. Duis mollis, est non commodo
    //       luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    //       Cras mattis consectetur purus sit amet fermentum.
    //     </p>
    //   </Alert>
    // );

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{heading}</h4>
          <p className="preferences_account">
            EXCHANGE WALLET / <span>{heading.toUpperCase()}</span>
          </p>
          <div className="row select-button" style={styles.newelementrow}>
            <div className="col-md-7">
              {this.state.googleAuth ? (
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
              ) : (
                <button
                  type="button"
                  className="btn btn-default bitcion_button"
                  style={styles.btn}
                  onClick={() => alert('You need to enable Google Auth 2FA')}
                >
                  <img src={Bitcoin} alt="Bitcoin" style={styles.img} />
                  &nbsp; Bitcoin &nbsp;
                  <span>Avl: 0</span>
                </button>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {this.state.googleAuth ? (
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
              ) : (
                <button
                  type="button"
                  className="btn btn-default bitcion_button"
                  style={styles.btn}
                  onClick={() => alert('You need to enable Google Auth 2FA')}
                >
                  <img src={Tether} alt="Tether" style={styles.img} />
                  &nbsp; Tether &nbsp;
                  <span>Avl: 0</span>
                </button>
              )}
            </div>
            <div className="col-md-5" />
          </div>
          <div className="row dropdown">
            <div className="col-md-6" style={styles.select}>
              <Select options={options} onChange={this.setLoction} />
            </div>
            <div className="col-md-6" />
          </div>
        </div>
        <div className="row account_detail withdrawalcontainer">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">Deposit History</h4>
            </div>
            <div className="clear-fix" />
            <div className="table-responsive">
              <table className="table balances_table table-striped dashboard_table">
                <tbody>
                  <tr>
                    <th>Assets</th>
                    <th>Deposit</th>
                    <th>Deposit History</th>
                    {/* <th>Amount</th>
                    <th>Status</th>
                    <th>Tx Info</th> */}
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

Deposit.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Deposit));
