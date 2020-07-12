import React, {Component} from 'react';
import KeyPairModal from './api-secret-name-modal';
import './ApiSecret.css';
import MFAModal from '../../enter-2fa-modal/2fa-modal';
import {connect} from 'react-redux';
import {resetMFAAuthentication} from '../../../../redux/actions/authActions';
import {
  getAllApiKeys,
  clearKeys,
  deleteApiKey,
} from '../../../../redux/actions/apiSecretand2faAction';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import _ from 'lodash';

export class ApiSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show2fa: false,
      openKeyPairModal: false,
      apiSecretKeysArray: this.props.apikeys.apiSecretKeysArray || [],
    };
  }

  componentDidMount = () => {
    // asynchronous so that root can set auth token
    setTimeout(() => {
      this.props.getAllApiKeys();
    });
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.auth.currentMFAaction == 'generateApiKeys') {
      this.props.resetMFAAuthentication();
      this.setState({openKeyPairModal: true});
    }
    if (
      !_.isEqual(
        newProps.apikeys.apiSecretKeysArray,
        this.state.apiSecretKeysArray,
      )
    ) {
      this.setState({apiSecretKeysArray: newProps.apikeys.apiSecretKeysArray});
    }
  };

  componentWillUnmount = () => {
    this.props.clearKeys();
  };

  showMFAModal = (e) => {
    this.setState({show2fa: true});
  };

  hideMFAModal = (e) => {
    this.setState({show2fa: false});
  };

  showKeyPairModal = (e) => {
    this.setState({openKeyPairModal: true});
  };

  hideKeyPairModal = (e) => {
    this.setState({openKeyPairModal: false});
  };

  deleteKey = (id, name) => {
    this.props.deleteApiKey(id, name);
  };

  copyToClipboard = () => {
    window.alert('Copied !');
  };

  render() {
    return (
      <>
        <div className="containment">
          <div className="balances pb-5">
            <h3>API Credentials</h3>
            <hr />
            <div className="balance-notice">
              <h3>Activate 2FA</h3>
              <hr />
              <p>
                Please make sure that you have activated 2FA before proceeding.
              </p>
              <button onClick={this.showMFAModal} className="form-btn-yellow">
                Generate New API Key Pair
              </button>
            </div>
          </div>
          <div className="balances pt-5">
            <div className="table-container api-key-table contained pb-3">
              <div className="table-header">
                <h3>Existing Keys</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th style={{textAlign: 'left'}}>Keys</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.apiSecretKeysArray.map((el, i) => {
                      let {id, key, name, secret} = el;
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
                                  <span className="copy-text">Copy</span>
                                </CopyToClipboard>
                              </div>
                              <div className="key">
                                <span className="heading">Secret :</span>
                                <span>{secret}</span>
                                <CopyToClipboard
                                  onCopy={this.copyToClipboard}
                                  text={secret}
                                >
                                  <span className="copy-text">Copy</span>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                this.deleteKey(el.id, el.name);
                              }}
                              className="form-btn-gray"
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
        </div>
        {this.state.show2fa ? (
          <MFAModal
            hideMFAModal={this.hideMFAModal}
            validateFor={'generateApiKeys'}
          />
        ) : (
          <></>
        )}
        {this.state.openKeyPairModal ? (
          <KeyPairModal hideKeyPairModal={this.hideKeyPairModal} />
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStatesToProps = (state) => ({
  auth: state.auth,
  apikeys: state.apikeys,
});

export default connect(mapStatesToProps, {
  resetMFAAuthentication,
  getAllApiKeys,
  clearKeys,
  deleteApiKey,
})(ApiSecret);
