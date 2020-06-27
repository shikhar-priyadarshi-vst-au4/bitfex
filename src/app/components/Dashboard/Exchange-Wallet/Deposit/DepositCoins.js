import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import A5DBSelect from '../../a5-themed-select/a5-themed-select';

import QRCode from 'qrcode.react';

import {currencyOptions} from '../../fakeStore';

class DepositCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usdtQrCode: '332NovkjmCGDiN4iD7QzsQjQb81LXvXznv',
      btcQrCode: '0x8dABb43a909b6816Ee22aD3a6444C9dD29Bf84Bf',
      copied: false,
      defaultCurrency: '',
      activeQrCode: '',
    };
  }

  componentDidMount = () => {
    const {heading, name, routes, location} = this.props;
    const BTC = routes[1].layout + routes[1].path;
    const USDT = routes[2].layout + routes[2].path;

    let currArray = Object.keys(currencyOptions);

    this.currencyArrayForSelect = currArray.map((symbol, index) => ({
      ...currencyOptions[symbol],
    }));

    switch (location.pathname) {
      case BTC:
        this.setState({
          defaultCurrency: currencyOptions['BTC'],
          activeQrCode: this.state.btcQrCode,
        });
        break;

      case USDT:
        this.setState({
          defaultCurrency: currencyOptions['USDT'],
          activeQrCode: this.state.usdtQrCode,
        });
        break;
    }
  };

  copyRef = React.createRef();

  currencyArrayForSelect = [];

  handleSelect = (item) => {
    this.props.history.push(item.depositPath());
  };

  copyText = () => {
    this.copyRef.current.select();
    document.execCommand('copy');
    this.copyRef.current.focus();
    this.setState({copied: true});
    setTimeout(() => {
      this.setState({copied: false});
    }, 3000);
  };

  showCpyText = () =>
    this.state.copied ? (
      <span
        style={{
          marginLeft: '1rem',
          color: 'var(--green)',
        }}
      >
        copied !!
      </span>
    ) : (
      <></>
    );

  render() {
    const {heading, name, routes, location} = this.props;
    const BTC = routes[1].layout + routes[1].path;
    const USDT = routes[2].layout + routes[2].path;
    const defaultCurrency = this.state.defaultCurrency;

    return (
      <>
        <div className="containment">
          <div className="balances">
            <h3> Deposit </h3>
            <div className="left-sided">
              <div className="a5-form-field mt-5">
                <A5DBSelect
                  itemList={this.currencyArrayForSelect}
                  placeholder={'Select...'}
                  defaultValue={this.state.defaultCurrency}
                  onChange={(item) => {
                    this.handleSelect(item);
                  }}
                />
              </div>
            </div>
            <div className="left-sided qr-left-sided d-flex">
              <div className="qr-container mt-4 d-flex">
                <QRCode
                  includeMargin={true}
                  size={160}
                  value={this.state.activeQrCode}
                />
                <div className="two-factor-code">
                  <input
                    ref={this.copyRef}
                    type="text"
                    readOnly
                    value={this.state.activeQrCode}
                  />
                  <img onClick={this.copyText} src="db-assets/copy-icon.svg" />
                  {this.showCpyText()}
                  <h3>Note :</h3>
                  <ul>
                    <li>
                      <span className="diamond"></span>
                      Only 2 blockchain confirmations are required for a
                      successful deposit
                    </li>
                    <li>
                      <span className="diamond"></span>
                      You can track the deposit progress in the wallet history
                      section.
                    </li>
                    <li>
                      <span className="diamond"></span>
                      Do not deposit any other token to this address.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="currency-balance-details">
                <h3>
                  {location.pathname == BTC
                    ? 'BTC'
                    : location.pathname == USDT
                    ? 'USDT'
                    : ''}{' '}
                  Balance Details
                </h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td>
                        {defaultCurrency
                          ? (
                              defaultCurrency.availableBalanceExchange +
                              defaultCurrency.availableBalanceOptions +
                              defaultCurrency.availableBalanceFutures
                            ).toFixed(defaultCurrency.toFixed)
                          : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td>In Order</td>
                      <td>
                        {defaultCurrency
                          ? (
                              defaultCurrency.availableBalanceOptions +
                              defaultCurrency.availableBalanceFutures
                            ).toFixed(defaultCurrency.toFixed)
                          : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td>Available</td>
                      <td>
                        {defaultCurrency
                          ? defaultCurrency.availableBalanceExchange.toFixed(
                              defaultCurrency.toFixed,
                            )
                          : ''}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="balances mt-5">
            <div className="table-container contained deposits pb-3">
              <div className="table-header">
                <h3>{heading} Deposit History</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>4</td>
                      <td>0.000</td>
                      <td>0.000</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>0.000</td>
                      <td>0.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(DepositCoins);
