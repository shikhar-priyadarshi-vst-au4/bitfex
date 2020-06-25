import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import Select from 'react-select';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

export class TransferModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      future_string: 'Futures Wallet',
      option_string: 'Options Wallet',
      exchange_string: 'Exchang Wallet',
      toggleWalletState: true,
      currencyType: 'BTC',
      funds: '',
      balance: '0.00000000',
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

  getCurrInstrument = () => this.props.instruments.currentInstrument;

  walletsArray = ['Futures Wallet', 'Options Wallet'];
  toggleWallet = () =>
    this.setState((prev) => ({toggleWalletState: !prev.toggleWalletState}));

  componentDidMount() {
    const {location} = this.props;
    if (location === '/dashboard/options') {
      this.setState({
        future_string: 'Options Wallet',
      });
    }
  }

  amntTransfer = (e) => {
    const {balance} = this.state;

    if (balance < e.target.value) {
      this.setState({
        funds: 'Please enter an amount no higher than your available balance.',
      });
    } else if (e.target.value === '0') {
      this.setState({
        funds: 'Please enter a valid amount.',
      });
    } else if (e.target.value === '') {
      this.setState({
        funds: '',
      });
    }
  };

  getCurrencyType = (e) => {
    this.setState({currencyType: e.value});
  };

  render() {
    const {location, btnexchange, btntransfer, id} = this.props;
    const {currencyType} = this.state;
    const options = [
      {
        value: 'BTC',
        label: (
          <div>
            <img src={Bitcoin} alt="Bitcoin" style={{height: '22px'}} /> BTC{' '}
          </div>
        ),
      },
      {
        value: 'USDT',
        label: (
          <div>
            <img src={Tether} alt="Tether" style={{height: '22px'}} /> USDT{' '}
          </div>
        ),
      },
    ];

    const styles = {
      modelheader: {
        marginLeft: '300px',
        fontSize: '19px',
      },
      frombubblecontainer: {
        marginLeft: '10px',
      },
      bubbles: {
        border: '1px thin black',
      },
      amountdiv: {
        marginBottom: '5px',
        marginTop: '12px',
      },
      amount: {
        width: '100%',
        outline: '0',
        borderWidth: '0 0 2px',
        borderColor: '#5ea2b2',
      },
      selectdiv: {},
      cnfrmbtn: {
        height: '50px',
        marginRight: '69px',
        width: '100%',
        marginLeft: '69px',
        borderRadius: '4px',
        fontSize: '14px',
      },
      avBlanceInput: {
        width: '100%',
        height: '33px',
        border: 'none',
        borderRadius: '3px',
        outline: 'none',
        marginTop: '26px',
      },
      errmsg: {
        marginLeft: '20px',
        color: 'red',
      },
    };
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={styles.modelheader}
          >
            {id === '1' ? btntransfer : id === '2' ? btnexchange : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-3" style={styles.frombubblecontainer}>
              {' '}
              <p style={{marginLeft: '20px'}}>From</p>
              <div
                className="bubble"
                style={{
                  border: '1px solid black',
                  padding: '15px',
                  borderRadius: '3px',
                  backgroundColor: '#d5cfcf',
                  height: '50px',
                  marginLeft: '20px',
                }}
              >
                {this.state.toggleWalletState
                  ? this.state.exchange_string
                  : this.state.future_string}
              </div>
            </div>
            <div className="col-md-1" style={{marginTop: '43px'}}>
              <span
                style={{
                  border: '2px solid #4d763c',
                  borderRadius: '19px',
                  padding: '12px',
                }}
              >
                <i
                  onClick={this.toggleWallet}
                  className="fa fa-exchange"
                  style={{color: '#5ea2b2', fontSize: '19px'}}
                ></i>
              </span>
            </div>
            <div className="col-md-3" style={styles.tobubblecontainer}>
              <p style={{marginLeft: '20px'}}>To</p>
              <div
                className="bubble"
                style={{
                  border: '1px solid black',
                  padding: '15px',
                  borderRadius: '3px',
                  backgroundColor: '#d5cfcf',
                  height: '50px',
                  marginLeft: '20px',
                }}
              >
                {!this.state.toggleWalletState
                  ? this.state.exchange_string
                  : this.state.future_string}
              </div>
            </div>
            <div className="col-md-2" />
          </div>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <p>Coin</p>
              <Select
                options={options}
                defaultValue={options[0]}
                onChange={this.getCurrencyType}
              />
            </div>
            <div className="col-md-1" />
          </div>
          <div className="row" style={styles.amountdiv}>
            <div className="col-md-1" />
            <div className="col-md-6">
              <p>Amount</p>
              <input
                type="text"
                placeholder="Type your Amount"
                style={styles.amount}
                onChange={this.amntTransfer}
              />
            </div>
            <div className="col-md-4">
              <div
                style={styles.avBlanceInput}
              >{` Available: ${this.state.balance} ${currencyType} `}</div>
            </div>
            <div className="col-md-1" />
          </div>
          <div className="row fee-balance-wrapper">
            <div className="col-md-1" />
            <div className="col-md-10">
              <span className="" style={styles.errmsg}>
                {this.state.funds}
              </span>
            </div>
            <div className="col-md-1" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            variant="primary"
            className="btn btn-primary"
            style={styles.cnfrmbtn}
          >
            Confirm Transfer
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TransferModel.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(TransferModel);
