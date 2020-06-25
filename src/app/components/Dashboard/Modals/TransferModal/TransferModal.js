import React, {Component} from 'react';
import {currencyOptions} from '../../fakeStore';
import './TransferModal.css';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';
import _ from 'lodash';

export class TransferModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_string: this.props.fromWallet,
      to_String: this.props.toWallet,
      currencyArrayForSelect: [],
      selectedCurrency: '',
      insufficientFundError: false,
      amountRequiredError: false,
    };
  }

  getBalance = () => {
    let slctdCurr = this.state.selectedCurrency;
    switch (this.state.from_string) {
      case 'EXCHANGE WALLET':
        return slctdCurr.availableBalanceExchange;
      case 'OPTIONS WALLET':
        return slctdCurr.availableBalanceOptions;
      case 'FUTURES WALLET':
        return slctdCurr.availableBalanceFutures;
    }
  };

  currencyKeys = Object.keys(currencyOptions);

  amountRef = React.createRef();

  componentDidMount = () => {
    let currencyArrayForSelect = this.currencyKeys.map((key) => ({
      ...currencyOptions[key],
    }));
    this.setState({
      currencyArrayForSelect,
      selectedCurrency: currencyArrayForSelect[0],
    });
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.toWallet != this.props.toWallet) {
      this.setState({
        from_string: newProps.fromWallet,
        to_String: newProps.toWallet,
      });
    }
  };

  handleError = () => {
    return <span className="form-field-error"></span>;
  };

  swapWallets = () => {
    this.setState((p) => ({
      from_string: p.to_String,
      to_String: p.from_string,
    }));
  };

  curtainClick = (e) => {
    this.closeModal();
  };

  closeModal = () => {
    this.props.hideTransferBalanceModal();
  };

  handleCoinSelect = (item) => {
    this.setState({selectedCurrency: item});
  };

  handleAmountInput = (e) => {
    let slctdCurr = this.state.selectedCurrency;
    let amount = this.getBalance();
    let val = e.target.value;
    let enteredSum = parseFloat(val);
    if (val.indexOf('e') != -1)
      this.amountRef.current.value = amount.toFixed(slctdCurr.toFixed);
    if (!enteredSum) {
      this.setState({amountRequiredError: true, insufficientFundError: false});
    } else if (enteredSum > amount) {
      this.setState({insufficientFundError: true, amountRequiredError: false});
    } else {
      this.setState({insufficientFundError: false, amountRequiredError: false});
    }
  };

  getErrorMsg = () => {
    return this.state.amountRequiredError ? (
      <span className="form-field-error">Amount Required !</span>
    ) : this.state.insufficientFundError ? (
      <span className="form-field-error">Insufficient Funds !</span>
    ) : (
      <></>
    );
  };

  render() {
    const {location} = this.props;
    const slctdCurr = this.state.selectedCurrency;

    return this.props.show ? (
      <>
        <div onClick={this.curtainClick} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="modal-container">
            <div className="balances">
              <h3>
                Transfer{' '}
                <span onClick={this.closeModal} className="rt-icons-balances">
                  X
                </span>
              </h3>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-6">
                    <div className="transfer-bubble-holder d-flex justify-content-center align-items-center">
                      <div className="bubble-container">
                        <h3>From</h3>
                        <div className="bubble">{this.state.from_string}</div>
                      </div>
                      <img
                        onClick={() => this.swapWallets()}
                        src="db-assets/transfer-icon.svg"
                      />
                      <div className="bubble-container">
                        <h3>To</h3>
                        <div className="bubble">{this.state.to_String}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
              <div className="left-sided">
                <div className="mb-6rem balances-form with-inline-info">
                  <div className="a5-form-field">
                    <label>Select Currency</label>
                    <A5DBSelect
                      defaultValue={slctdCurr}
                      itemList={this.state.currencyArrayForSelect}
                      placeholder={'Select...'}
                      onChange={(item) => {
                        this.handleCoinSelect(item);
                      }}
                    />
                  </div>
                  <div className="a5-form-field with-inline-info">
                    <label>Amount</label>
                    <input
                      ref={this.amountRef}
                      type="number"
                      onInput={this.handleAmountInput}
                      step={10 ** (slctdCurr.toFixed * -1)}
                      min={0}
                    />
                    <span className="form-field-info">
                      {slctdCurr
                        ? this.getBalance().toFixed(slctdCurr.toFixed)
                        : ''}{' '}
                      {slctdCurr.symbol}
                    </span>
                    {this.getErrorMsg()}
                  </div>
                  <div className="a5-form-btn-grp">
                    <button className="form-btn-yellow withdrawl-coin-send-button">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <></>
    );
  }
}

export default TransferModel;
