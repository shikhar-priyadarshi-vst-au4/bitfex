import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {Slide} from 'react-awesome-reveal';
import store from '../../../../Redux_Store/store';
import {resendEmailAPI} from '../../../confirm-email-code/confirm-mail-api';
import {withAlert} from 'react-alert';
class Email2faVerfication extends Component {
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
    resendEmailAPI.resendEmail(
      this.props.profile.profile.email,
      'change_password',
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
    this.props.clearErrors();
    this.setState({emailCode, emailCodeError, formError: ''});
  };

  google2FACodeChange = (e) => {
    e.preventDefault();
    let faCode = e.target.value;
    let faCodeError = '';
    if (!faCode) {
      faCodeError = 'Please enter 2 fa Activation Code';
    }
    this.props.clearErrors();
    this.setState({faCode, faCodeError, formError: ''});
  };
  componentWillReceiveProps = (nextProps) => {
    console.log('nextProps', nextProps);
    if (nextProps.errors === 'Token MisMatch') {
      this.props.alert.error('Wrong Token or Password Entered');
      setTimeout(() => {
        store.dispatch({type: 'SET_ERRORS', payload: null});
      }, 1000);
    }

    if (nextProps.auth.resendMailStatus === true) {
      this.setState({
        result: 'Code Sucessfully Send on registerd email id',
      });
      store.dispatch({type: 'RESEND_EMAIL_STATUS', payload: null});
      setTimeout(() => {
        this.setState({result: ''});
      }, 2000);
    }

    if (nextProps.auth.passwordChanged === true) {
      this.props.alert.success('Password Changed Sucessfully');
      setTimeout(() => {
        store.dispatch({type: 'USER_PASSWORD_CHANGE', payload: null});
        this.props.history.push('/dashboard/account');
      }, 500);
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.clearErrors();
    const {emailCode, faCode} = this.state;

    if (emailCode.length >= 6 && faCode.length >= 6) {
      this.props.getSecurtyValue({emailCode, faCode});
      this.props.onDataSubmit();
    } else {
      let emailCodeError = '';
      let faCodeError = '';
      if (emailCode.length < 6) {
        emailCodeError = 'Code Must be of 6 digit';
      }
      if (!emailCode) {
        emailCodeError = 'Please enter email Activation Code !!';
      }

      if (!faCode) {
        faCodeError = 'Please enter 2 fa Verification Code ';
      }
      if (faCode.length < 6) {
        faCodeError = 'Code Must be of 6 digit';
      }
      this.setState({
        emailCodeError,
        faCodeError,
        formError: '',
        isDirty: true,
      });
    }
  };
  render() {
    const {previous, next} = this.props.navigation;
    return (
      <>
        <div className="main">
          <div className="main-header">
            <h3>Account & Preferences</h3>
            <div className="main-sub-header">
              Change Password
              <hr />
            </div>
          </div>
          <Slide direction="right">
            <div className="main-body">
              <div className="form-body white-bg" style={{minWidth: '35rem'}}>
                <h3>Security Verification</h3>
                <div className="form-container" style={{minWidth: '33rem'}}>
                  <span style={{marginLeft: '3rem'}}>
                    <strong style={{fontWeight: '500', color: '#f9a931'}}>
                      {this.state.result}
                    </strong>
                  </span>
                  <div className="a5-login-field" style={{marginTop: '-31px'}}>
                    <input
                      onInput={this.emailCodeChange}
                      type="text"
                      placeholder="Email Verification Code"
                    />
                    <span className="a5-login-error">
                      {this.state.emailCodeError}
                    </span>
                  </div>

                  <div className=" d-flex " style={{marginTop: '28px'}}>
                    <div className="emailMsg">
                      {' '}
                      <span
                        style={{
                          fontWeight: '100',
                          fontSize: '14px',
                        }}
                      >
                        Enter the 6 digit code received by{' '}
                        <strong style={{fontWeight: '500', color: '#f9a931'}}>
                          {this.props.profile.profile.email}
                        </strong>
                      </span>
                    </div>
                    <div className="already ml-3">
                      <button
                        disabled={!this.state.disabled}
                        style={{
                          fontSize: '14px',
                          color: this.state.disabled ? '#f9a931' : '#666666',
                          border: 'none',
                          background: 'none',
                          marginTop: '8px',
                          outline: 'none',
                        }}
                        onClick={this.handleResendEmail}
                      >
                        Resend Email{' '}
                        {this.state.disabled ? null : `${this.state.seconds}s`}
                      </button>
                    </div>
                  </div>

                  <div className="a5-login-field" style={{marginTop: '-53px'}}>
                    <input
                      onInput={this.google2FACodeChange}
                      type="text"
                      placeholder="Enter 2fa Verification Code"
                    />
                    <span className="a5-login-error">
                      {this.state.faCodeError}
                    </span>
                  </div>
                  <div className=" d-flex " style={{marginTop: '32px'}}>
                    <div className="emailMsg">
                      <span
                        style={{
                          fontWeight: '100',
                          fontSize: '14px',
                        }}
                      >
                        Enter the 6 digit 2FA code from google authenticator app
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around mt-5 mb-3">
                    <button onClick={previous} className="form-btn yellow">
                      Previous
                    </button>

                    <button onClick={this.onSubmit} className="form-btn yellow">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {
    clearErrors,
  }),
  withRouter,
)(Email2faVerfication);
