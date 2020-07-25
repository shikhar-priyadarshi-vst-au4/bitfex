import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../validation/is-empty';
import {resetPassword, sendEmail} from '../../redux/actions/authActions';
import {clearErrors} from '../../redux/actions/errorActions';
import {FORGOT_PASSWORD} from '../../constant';
import Bitfex_log from '../../../assets/img/bitfex-logo-dark.svg';

const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.auth.forgotPasswordEmail.email || '',
      password: '',
      password_confirmation: '',
      token: '',
      successmsg: '',
      tokenError: '',
      passError: '',
      cnfPassError: '',
      formError: '',
      isDirty: false,
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors.type === 'forbidden') {
      this.setState({formError: 'Invalid username'});
    }
    if (!isEmpty(nextProps.auth.forgotPasswordEmail.email)) {
      this.setState({email: nextProps.auth.forgotPasswordEmail.email});
    }
    if (!isEmpty(nextProps.auth.resetPasswordValue)) {
      this.setState({successmsg: 'Your password reset successfully'});
      setTimeout(() => {
        // return <Redirect to="/login" />;
        this.props.history.push('/login');
      }, 2000);
    }
    if (nextProps.errors.type === 'email_or_token_invalid') {
      this.setState({
        formError: 'Token is invalid',
      });
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (newState.formError) {
      setTimeout(() => {
        this.setState({formError: ''});
      }, 3000);
    }
    if (newState.successmsg) {
      setTimeout(() => {
        this.setState({successmsg: ''});
      }, 2000);
    }
  };

  allowSubmission = () => {
    const {passError, cnfPassError, tokenError, isDirty} = this.state;
    return !(passError || cnfPassError || tokenError) && isDirty;
  };

  restPassword = (e) => {
    e.preventDefault();
    const {email, password, password_confirmation, token} = this.state;
    if (
      this.allowSubmission() &&
      password != '' &&
      password_confirmation != '' &&
      token != ''
    ) {
      this.props.resetPassword({email, password, password_confirmation, token});
    } else {
      let passError = '';
      let cnfPassError = '';
      let tokenError = '';

      if (!password) {
        passError = 'Password is Required!';
      }
      if (!password_confirmation) {
        cnfPassError = 'Please enter confirm password!';
      }
      if (!token) {
        tokenError = 'Token is Required!';
      }
      this.setState({
        passError,
        cnfPassError,
        tokenError,
        password,
        formError: '',
        isDirty: true,
      });
    }
  };

  handlePasswordInput = (e) => {
    e.preventDefault();
    let password = e.target.value;
    let passError = '';
    if (!password) {
      passError = 'Password is required !';
    } else if (password.length < 8) {
      passError = 'Password should be minimum of min 8 characters!';
    } else if (!validPassword.test(password)) {
      passError =
        'Your password must contain at least one lowercase letter, one capital letter, one special character and one number!';
    }
    this.props.clearErrors();
    this.setState({password, passError, formError: '', isDirty: true});
  };

  handleCnfrmPasswordInput = (e) => {
    e.preventDefault();
    let password_confirmation = e.target.value;
    const {password} = this.state;
    let cnfPassError = '';
    if (!password_confirmation) {
      cnfPassError = 'Please enter confirm password!';
    } else if (password_confirmation !== password) {
      cnfPassError = 'Password must match!';
    }
    this.props.clearErrors();
    this.setState({
      password_confirmation,
      cnfPassError,
      formError: '',
      isDirty: true,
    });
  };

  handleTokenInput = (e) => {
    e.preventDefault();
    let token = e.target.value;
    let tokenError = '';
    if (!token) {
      tokenError = 'Please enter token!';
    } else if (token.length < 6) {
      tokenError = 'Password should be minimum of min 6 numbers!';
    }
    this.props.clearErrors();
    this.setState({
      token,
      tokenError,
      formError: '',
      isDirty: true,
    });
  };

  handleEmail = (e) => {
    e.preventDefault();
    this.props.sendEmail(this.state.email, FORGOT_PASSWORD);
    if (!isEmpty(this.props.auth.sendEmail)) {
      this.setState({successmsg: 'Email Verification code sent successfully'});
    }
  };

  render() {
    console.log(this.props.auth);
    console.log(this.state);
    return (
      <div className="wrapper">
        <div className="frm-wrapper">
          <section className="frm-block">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="logo">
                    <a href="/">
                      <img src={Bitfex_log} alt="Bitfex Exchange" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="frm-outer">
                    <div className="frm-body">
                      {this.state.formError && (
                        <div className="auth-error">
                          <p>{this.state.formError}</p>
                        </div>
                      )}
                      {this.state.successmsg && (
                        <div className="resetsuccessmsg-success">
                          <p>{this.state.successmsg}</p>
                        </div>
                      )}
                      <h4>Change Password</h4>
                      <form>
                        {/* <div className="auth-error">
                          <p>
                            {'{'}
                            {'{'}error from server{'}'}
                            {'}'}
                          </p>
                        </div> */}
                        <div>
                          <div className="form-group input-ico pwd">
                            <label htmlFor="password" className="form-label">
                              New Password
                            </label>
                            <input
                              className={classnames('form-input', {
                                'is-invalid': this.state.passError,
                              })}
                              formcontrolname="newPassword"
                              type="password"
                              maxLength={20}
                              minLength={8}
                              placeholder="8-20 alpha numeric characters"
                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                              onInput={this.handlePasswordInput}
                            />
                            {this.state.passError && (
                              <div className="invalid-feedback">
                                {this.state.passError}
                              </div>
                            )}
                            {/* <div className="form-valid-error">
                              <div>Password is required!</div>
                              <div>
                                Password should be minimum of {'{'}
                                {'{'}Length{'}'}
                                {'}'}
                                characters!
                              </div>
                              <div className="error-msg">
                                Your password must contain at least one
                                lowercase letter, one capital letter and one
                                number
                              </div>
                            </div> */}
                          </div>
                          <div className="form-group input-ico pwd">
                            <label htmlFor="password" className="form-label">
                              Confirm Password
                            </label>
                            <input
                              className="form-input"
                              className={classnames('form-input', {
                                'is-invalid': this.state.cnfPassError,
                              })}
                              formcontrolname="confirmPassword"
                              type="password"
                              maxLength={20}
                              onInput={this.handleCnfrmPasswordInput}
                            />
                            {this.state.cnfPassError && (
                              <div className="invalid-feedback">
                                {this.state.cnfPassError}
                              </div>
                            )}
                            {/* <div className="form-valid-error">
                              <div>Confirm password is required!</div>
                              <div>Passwords must match!</div>
                            </div> */}
                          </div>
                          <div className="form-group input-ico pwd">
                            <label htmlFor="password" className="form-label">
                              Token
                            </label>
                            <input
                              className="form-input"
                              className={classnames('form-input', {
                                'is-invalid': this.state.tokenError,
                              })}
                              formcontrolname="token"
                              type="password"
                              maxLength={6}
                              onInput={this.handleTokenInput}
                            />
                            {this.state.tokenError && (
                              <div className="invalid-feedback">
                                {this.state.tokenError}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="password" className="form-label">
                              <button
                                style={{
                                  fontSize: '14px',
                                  color: 'rgb(2, 120, 225)',
                                  border: 'none',
                                  background: 'none',
                                }}
                                onClick={this.handleEmail}
                              >
                                Resend Email{' '}
                              </button>
                            </label>
                          </div>
                          <div className="text-center">
                            <button
                              className="form-button"
                              type="submit"
                              onClick={this.restPassword}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                        {/* <div className="msg-success">
                          {'{'}
                          {'{'} resetPasswordSuccessMsg {'}'}
                          {'}'}
                        </div> */}
                        <div className="frm-footer">
                          <div className="forgot">
                            Back to <Link to="/login">Log In</Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  resetPassword,
  clearErrors,
  sendEmail,
})(withRouter(ResetPassword));
