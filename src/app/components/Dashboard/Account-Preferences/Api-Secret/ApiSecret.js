import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import MFAModal from '../../Models/enter-2fa-modal/2fa-modal';
import {
  deleteapikey,
  clearKeys,
  allapisecretkey,
} from '../../../../redux/actions/apiSecretand2faAction';
import {resetMFAAuthentication} from '../../../../redux/actions/authActions';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInr, faHistory, faCopy} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-bootstrap';
// import {useAlert} from 'react-alert';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import ApiScretekeyModel from '../../Models/ApiScretekeyModel/ApiScretekeyModel';

export class ApiSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show2fa: false,
      apiSecretkey: this.props.apisecretkeys.apisecretkeys || [],
      openKeyPairModal: false,
      openTransferBalModal: false,
    };
  }

  componentDidMount() {
    // this.props.setCurrentUser();
    // if (this.props.auth.isAuthenticated) {
    //   document.title = this.props.auth.user.email;
    // }
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    setTimeout(() => {
      this.props.allapisecretkey();
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.auth.currentMFAaction == 'generateApiKeys') {
      this.props.resetMFAAuthentication();
      this.setState({openKeyPairModal: true});
      this.setState({openTransferBalModal: true});
    }

    if (
      !_.isEqual(
        newProps.apisecretkeys.apiSecretKeysArray,
        this.state.apiSecretKeysArray,
      )
    ) {
      this.setState({apiSecretkey: newProps.apisecretkeys.apiSecretKeysArray});
    }
  }

  componentWillUnmount = () => {
    this.props.clearKeys();
  };

  showMFAModal = (e) => {
    this.setState({show2fa: true});
  };

  hideMFAModal = (e) => {
    this.setState({show2fa: false});
  };

  showTransferBalanceModal = (e) => {
    this.setState({openTransferBalModal: true});
    this.setState({id: e.target.id});
  };

  hideTransferBalanceModal = () => {
    this.setState({openTransferBalModal: false});
  };

  copyToClipboard = () => {
    window.alert('Copied !');
  };

  deleteapikeys = (name) => {
    // console.log(key);
    confirmAlert({
      title: 'Are you sure?',
      message: `Do you confirm that you want to delete the API Key named ${name}?`,
      buttons: [
        {
          label: `DELETE ${name.toUpperCase()}`,
          onClick: () => {
            this.props.deleteapikey(name);
          },
        },
        {
          label: 'GO BACK',
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const Profile = this.props.heading;

    const styles = {
      fontbutton: {
        border: 'none',
        backgroundColor: 'white',
      },
      fontclass: {
        fontSize: '18px',
        color: '#00afff',
      },
      apikeyaddbtn: {
        fontSize: '16px',
        color: 'white',
        fontWeight: '500',
        border: 'none',
        height: '50px',
        width: '272px',
        backgroundColor: '#f18d05',
        boxShadow: '1 3px 7px -1px rgba(1,1,1,.4)',
      },
    };

    return (
      <div className="col-md-12 contentcontainer">
        <div className="wallet_container">
          <h4 className="content_heading">{Profile}</h4>
          <p className="preferences_account">
            ACCOUNT &amp; PREFERENCES / <span> {Profile.toUpperCase()}</span>
          </p>
          {/* <div className="credentials">
              <p>
                Please enable google two factor authentication to get api
                secret!
              </p>
            </div> */}
          <Button
            style={styles.apikeyaddbtn}
            id="1"
            onClick={this.showMFAModal}
          >
            Genrate Api Key
          </Button>

          <div className="row account_detail">
            <p style={{color: '#e43626', fontWeight: 'bold'}}>
              NOTE: The Secret key will be hidden forever. if u change the page
              or you refresh the page. Kindly save it securely.
            </p>
            <div className="col-md-12 balance_container">
              <div className="">
                <h4 className="account_tableheading">Your API keys</h4>
              </div>
              <div className="clear-fix" />
              <div className="table-responsive api-key-table">
                <table className="table balances_table table-striped dashboard_table">
                  <tbody>
                    <tr>
                      <th>Api Key Name</th>
                      <th style={{textAlign: 'left'}}>keys</th>
                      <th>Action</th>
                    </tr>
                    {this.state.apiSecretkey.map((item, i) => {
                      let {id, key, name, secret} = item;
                      return (
                        <tr key={i}>
                          <td>{name}</td>
                          <td>
                            <div className="d-flex flex-column align-items-start">
                              <div className="key">
                                <span className="heading">API Key :</span>
                                <span>{key}</span>
                                <CopyToClipboard
                                  onCopy={this.copyToClipboard}
                                  text={key}
                                >
                                  <button
                                    className="fontbutton"
                                    style={styles.fontbutton}
                                  >
                                    <span>
                                      <FontAwesomeIcon
                                        className="copy-text"
                                        icon={faCopy}
                                        style={styles.fontclass}
                                      />{' '}
                                      Copy
                                    </span>
                                  </button>
                                </CopyToClipboard>
                              </div>
                              <div className="key">
                                <span className="heading">Secret :</span>
                                <span>{secret}</span>
                                <CopyToClipboard
                                  onCopy={this.copyToClipboard}
                                  text={secret}
                                >
                                  <button
                                    className="fontbutton"
                                    style={styles.fontbutton}
                                  >
                                    <span>
                                      <FontAwesomeIcon
                                        className="copy-text"
                                        icon={faCopy}
                                        style={styles.fontclass}
                                      />{' '}
                                      Copy
                                    </span>
                                  </button>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                this.deleteapikeys(item.name);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {this.state.show2fa ? (
            <MFAModal
              onHide={this.hideMFAModal}
              hideMFAModal={this.hideMFAModal}
              show={this.state.show2fa}
              validateFor={'generateApiKeys'}
            />
          ) : (
            <></>
          )}
          {this.state.openKeyPairModal ? (
            <ApiScretekeyModel
              show={this.state.openTransferBalModal}
              onHide={this.hideTransferBalanceModal}
              hideKeyPairModal={this.hideKeyPairModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

ApiSecret.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteapikey: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  apisecretkeys: state.apisecretkeys,
});

export default connect(mapStateToProps, {
  resetMFAAuthentication,
  deleteapikey,
  allapisecretkey,
  clearKeys,
})(ApiSecret);
