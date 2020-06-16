import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';
import TransferModel from '../../Models/TransferModel/TransferModel';

export class OptionTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTransferBalModal: false,
      openAddExchangeModel: false,
      btnFirstTitle: 'Transfer',
      btnSecondTitle: 'Add from Exchange Wallet',
      id: '',
    };

    this.showTransferBalanceModal = this.showTransferBalanceModal.bind(this);
    this.hideTransferBalanceModal = this.hideTransferBalanceModal.bind(this);
  }

  showTransferBalanceModal = (e) => {
    this.setState({openTransferBalModal: true});
    this.setState({id: e.target.id});
  };

  hideTransferBalanceModal = () => {
    this.setState({openTransferBalModal: false});
  };

  render() {
    const {heading, routes, location} = this.props;
    // console.log(this.props);

    const styles = {
      transferbtn: {
        fontSize: '18px',
        border: '1px solid grey',
        marginLeft: '12px',
        height: '70px',
        width: '230px',
        boxShadow: '1 3px 7px -1px rgba(1,1,1,.4)',
      },
      exchangebtn: {
        fontSize: '18px',
        border: '1px solid grey',
        marginLeft: '12px',
        height: '70px',
        width: '330px',
        boxShadow: '1 3px 7px -1px rgba(1,1,1,.4)',
      },
    };

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{heading} WALLET</h4>
          <div
            className="row select-button"
            style={{
              marginTop: '15px',
            }}
          >
            <div className="col-md-8">
              <Button
                variant="primary"
                style={styles.transferbtn}
                id="1"
                onClick={this.showTransferBalanceModal}
              >
                {this.state.btnFirstTitle}
              </Button>
              <Button
                variant="primary"
                style={styles.exchangebtn}
                id="2"
                onClick={this.showTransferBalanceModal}
              >
                {this.state.btnSecondTitle}
              </Button>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
        <div className="row account_detail withdrawalcontainer">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">{heading} Wallet Details</h4>
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
                    <th className="created">NAV</th>
                    <th className="modified">In Order</th>
                    <th className="modified">Available Balance</th>
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
                    <td>0.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <TransferModel
          show={this.state.openTransferBalModal}
          onHide={this.hideTransferBalanceModal}
          location={location.pathname}
          btntransfer={this.state.btnFirstTitle}
          btnexchange={this.state.btnSecondTitle}
          id={this.state.id}
        />
      </div>
    );
  }
}

export default OptionTransfer;
