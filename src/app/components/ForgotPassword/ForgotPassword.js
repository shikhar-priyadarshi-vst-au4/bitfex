import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../validation/is-empty';
import {forgotPassword} from '../../redux/actions/authActions';
import {clearErrors} from '../../redux/actions/errorActions';
import './ForgotPassword.css';
import Bitfex_log from '../../../assets/img/bitfex-logo-dark.svg';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', emailError: '', formError: '', isDirty: false};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors.type === 'not_found') {
      this.setState({
        formError:
          'sorry your request failed, Our system is busy, Please try again later',
      });
    }
    if (!isEmpty(nextProps.auth.forgotPasswordEmail)) {
      this.props.history.push('/resetPassword');
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (newState.formError) {
      setTimeout(() => {
        this.setState({formError: ''});
      }, 3000);
    }
  };

  allowSubmission = () => {
    const {emailError, isDirty} = this.state;
    return !emailError && isDirty;
  };

  sensEmail = (e) => {
    e.preventDefault();
    const {email} = this.state;
    if (this.allowSubmission()) {
      this.props.forgotPassword(email);
    } else {
      let emailError = '';
      if (!email) {
        emailError = 'Email is Required !';
      } else if (!validEmailRegex.test(email)) {
        emailError = 'Please enter a valid email!';
      }
      this.setState({
        emailError,
        email,
        formError: '',
        isDirty: true,
      });
    }
  };

  handleEmailInput = (e) => {
    e.preventDefault();
    let email = e.target.value;
    let emailError = '';
    if (!email) {
      emailError = 'Email is Required !';
    } else if (!validEmailRegex.test(email)) {
      emailError = 'Please enter a valid email!';
    }
    this.props.clearErrors();
    this.setState({emailError, email, formError: '', isDirty: true});
  };

  render() {
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
                      <h4>Reset Password</h4>
                      <p>
                        Don’t worry! Just fill in your email id below and you
                        will receive a reset password verifiction code in your
                        inbox.
                      </p>
                      <div className="form-group input-ico email">
                        <label htmlFor="emailAddress" className="form-label">
                          Email
                        </label>
                        <input
                          formcontrolname="email"
                          type="email"
                          className={classnames('form-input', {
                            'is-invalid': this.state.emailError,
                          })}
                          placeholder="Enter your username or email"
                          maxLength={50}
                          onInput={this.handleEmailInput}
                        />
                        {this.state.emailError && (
                          <div className="invalid-feedback">
                            {this.state.emailError}
                          </div>
                        )}
                        {/* <div className="form-valid-error">
                      <div className="error-msg">
                        Please enter valid email address!
                      </div>
                      <div className="error-msg">
                        Email is required!
                      </div>
                    </div> */}
                        {/* <div className="form-valid-error">
                            <div className="error-msg">
                              {'{'}
                              {'{'}serverError{'}'}
                              {'}'}
                            </div>
                          </div> */}
                      </div>
                      <div className="text-center m-t-35">
                        <button
                          className="form-button reset-link-btn"
                          type="submit"
                          onClick={this.sensEmail}
                        >
                          Request Reset Code
                        </button>
                      </div>
                      <div className="reset-2fa">
                        If you have lost your 2FA token, please email us at
                        <a href="mailto:support@bitfex.com">
                          support@bitfex.com
                        </a>
                        with the subject "Lost 2FA Device".
                        <br />
                        <br />
                        Support team will share the 2FA recovery procedure with
                        you.
                      </div>
                      {/* <div className="msg-success">
                    {'{'}{'{'}forgotRequestSuccessMsg{'}'}{'}'}
                  </div> */}
                      <div className="frm-footer">
                        <div className="forgot">
                          Back to
                          <Link to="/login"> Log In</Link>
                        </div>
                      </div>
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

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {forgotPassword, clearErrors})(
  withRouter(ForgotPassword),
);
