import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setMFAAuthentication} from '../../../redux/actions/authActions';
import {resendEmailAPI} from '../../confirm-email-code/confirm-mail-api';
import {apiSecretKeyAPI} from '../Account-Preferences/Api-Secret/Api_SecretApi';
import store from '../../../Redux_Store/store';
class WithdrwalConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCode: '',
      faCode: '',
      successmsg: '',
      emailCodeError: '',
      faCodeError: '',
      formError: '',
      isDirty: false,
      disabled: '',
      seconds: 60,
      result: '',
    };
  }
  errorMap = {
    password_or_email_invalid: 'Invalid Email or Password!',
  };

  componentDidMount = () => {
    if (this.state.seconds > 0) {
      this.timer = setInterval(() => {
        let seconds = this.state.seconds - 1;
        this.setState({seconds});
      }, 1000);
    }
  };
  componentWillUpdate = (newProps, newState) => {
    if (this.state.seconds === 1) {
      clearInterval(this.timer, this.setState({disabled: 'show'}));
    }
    if (newState.seconds === 0) {
      this.setState({seconds: 60});
    }
  };

  handleResendEmail = (e) => {
    e.preventDefault();

    if (this.props.validateFor === '')
      resendEmailAPI.resendEmail(
        this.props.profile.profile.email,
        'delete_key_pair',
      );
    this.setState({result: ''});
    if (this.state.seconds > 0) {
      this.timer = setInterval(() => {
        let seconds = this.state.seconds - 1;
        this.setState({seconds, disabled: ''});
      }, 1000);
    }
  };
  emailCodeChange = (e) => {
    e.preventDefault();
    let emailCode = e.target.value;
    let emailCodeError = '';
    if (!emailCode) {
      emailCodeError = 'Please enter email Verification Code!';
    }
    this.setState({emailCode, emailCodeError, formError: ''});
  };

  google2FACodeChange = (e) => {
    e.preventDefault();
    let faCode = e.target.value;
    let faCodeError = '';
    if (!faCode) {
      faCodeError = 'Please enter 2 fa Activation Code';
    }

    this.setState({faCode, faCodeError, formError: ''});
  };

  apiNameChange = (e) => {
    e.preventDefault();
    let apiKeyName = e.target.value;
    let apiKeyError = '';
    if (!apiKeyName) {
      apiKeyError = 'Please enter valid name';
    }
    this.setState({apiKeyName, apiKeyError, formError: ''});
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('nextprops', nextProps);
    const {generateKeyPairStatus} = nextProps.apikeys;

    if (generateKeyPairStatus === false) {
      this.setState({
        result: 'Email Code or 2fa Code Might be wrong',
      });
      setTimeout(() => {
        this.setState({result: ''});
        store.dispatch({type: 'GENERATE_KEY_PAIR_STATUS', payload: null});
      }, 1000);
    }
    if (generateKeyPairStatus === true) {
      this.props.hideMFAModal();
      setTimeout(() => {
        store.dispatch({type: 'GENERATE_KEY_PAIR_STATUS', payload: null});
      }, 1000);
    }
    if (nextProps.auth.resendMailStatus === true) {
      this.setState({
        result: 'Code Sucessfully Send on registerd email id',
      });
      store.dispatch({type: 'RESEND_EMAIL_STATUS', payload: null});
      setTimeout(() => {
        this.setState({result: ''});
      }, 1000);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({result: ''});
    const {emailCode, faCode, apiKeyName} = this.state;

    if (emailCode.length >= 6 && faCode.length >= 6 && apiKeyName) {
      this.props.valueFromComponent({
        name: apiKeyName,
        token: emailCode,
        token_2fa: faCode,
      });
    } else {
      let emailCodeError = '';
      let faCodeError = '';
      if (emailCode.length < 6) {
        emailCodeError = 'Code Must be of 6 digit';
      }
      if (!emailCode) {
        emailCodeError = 'Please enter email Activation Code !!';
      }
      if (faCode.length < 6) {
        faCodeError = 'Code Must be of 6 digit';
      }
      if (!faCode) {
        faCodeError = 'Please enter 2 fa Verification Code ';
      }
      let apiKeyError = '';
      if (!apiKeyName) {
        apiKeyError = 'Please Enter Valid Name';
      }
      this.setState({
        emailCodeError,
        faCodeError,
        formError: '',
        apiKeyError,
        isDirty: true,
      });
    }
  };

  handleCode = (e) => {
    let val = e.target.value;
    this.setState({code: val, error: ''});
  };

  render() {
    return (
      <>
        <div onClick={() => this.props.hideMFAModal()} className="curtain">
          <div
            onClick={(e) => e.stopPropagation()}
            className="box-modal"
            style={{minHeight: '38rem', minWidth: '40rem'}}
          >
            <div className="box-modal-header text-center">
              <h3>Security Verification</h3>
            </div>
            <div className="box-modal-body">
              <div className="main-body">
                <span style={{marginLeft: '8rem'}}>
                  <strong style={{fontWeight: '500', color: '#f9a931'}}>
                    {this.state.result}
                  </strong>
                </span>
                <div
                  className="form-body white-bg"
                  style={{minHeight: '24rem', minWidth: '35rem'}}
                >
                  <div className="form-container" style={{minWidth: '31rem'}}>
                    <div
                      className="a5-login-field"
                      style={{marginTop: '-31px'}}
                    >
                      {this.props.tokenToDelete && (
                        <>
                          <input
                            onInput={this.apiNameChange}
                            type="text"
                            placeholder={this.props.tokenToDelete}
                            value={this.props.tokenToDelete}
                            readOnly
                          />
                          <span className="a5-login-error">
                            {this.state.apiKeyError}
                          </span>
                        </>
                      )}
                      {!this.props.tokenToDelete && (
                        <>
                          {' '}
                          <input
                            onInput={this.apiNameChange}
                            type="text"
                            placeholder="Enter API KEY Name"
                          />
                          <span className="a5-login-error">
                            {this.state.apiKeyError}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="a5-login-field">
                      <input
                        onInput={this.emailCodeChange}
                        type="text"
                        placeholder="Email Verification Code"
                      />
                      <span className="a5-login-error">
                        {this.state.emailCodeError}
                      </span>
                    </div>
                    <div
                      className=" d-flex justify-content-around"
                      style={{marginTop: '28px'}}
                    >
                      <div className="emailMsg">
                        {' '}
                        <span
                          style={{
                            fontWeight: '100',
                            fontSize: '12px',
                          }}
                        >
                          Enter the 6 digit code received by{' '}
                          <strong style={{fontWeight: '500', color: '#f9a931'}}>
                            {this.props.profile.profile.email}
                          </strong>
                        </span>
                      </div>
                      <div className="already">
                        <button
                          disabled={!this.state.disabled}
                          style={{
                            fontSize: '12px',
                            color: this.state.disabled ? '#f9a931' : '#666666',
                            border: 'none',
                            background: 'none',
                            marginTop: '8px',
                            outline: 'none',
                          }}
                          onClick={this.handleResendEmail}
                        >
                          Resend Email{' '}
                          {this.state.disabled
                            ? null
                            : `${this.state.seconds}s`}
                        </button>
                      </div>
                    </div>
                    <div
                      className="a5-login-field"
                      style={{marginTop: '-18px'}}
                    >
                      <input
                        onInput={this.google2FACodeChange}
                        type="text"
                        placeholder="Enter 2fa Verification Code"
                      />
                      <span className="a5-login-error">
                        {this.state.faCodeError}
                      </span>
                    </div>
                    <div className=" d-flex " style={{marginTop: '28px'}}>
                      <div className="emailMsg">
                        {' '}
                        <span
                          style={{
                            fontWeight: '100',
                            fontSize: '12px',
                          }}
                        >
                          Enter the 6 digit 2FA code from google authenticator
                          app
                        </span>
                      </div>
                    </div>
                    <div className="form-btn-holder align-items-center mt-5">
                      <a
                        onClick={this.onSubmit}
                        className="form-register align-items-center"
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MFAModal.propTypes = {
  hideMFAModal: PropTypes.func.isRequired,
  validateFor: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  apikeys: state.apikeys,
});

export default connect(mapStateToProps, {setMFAAuthentication})(
  WithdrwalConfirmation,
);
