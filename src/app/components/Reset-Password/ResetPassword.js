import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import store from '../../Redux_Store/store';
import { goToResetPasswordForm } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { resetPasswordAPI } from './Reset-PasswordApi';
import './ResetPassword.css';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
  }

  emailHandle = (e) => {
    let email = e.target.value;
    let emailError = '';

    if (!email) emailError = 'Email Required!';
    else if (!validEmailRegex.test(email))
      emailError = 'Please Enter a Valid Email !';

    this.setState({ email, emailError });
  };

  componentWillReceiveProps(nextProps) {
    console.log('props', nextProps);
    if (nextProps.auth.emailVerificationSend == true) {
      this.props.history.push('/password-change');
      store.dispatch({ type: 'EMAIL_VERIFICATION_SEND_SUCCESS', payload: null });
    }
    if (nextProps.auth.emailVerificationSend == false) {
      this.setState({ emailError: 'No such user Found.Please Register' });
      setTimeout(() => {
        this.setState({ emailError: '' });
      }, 1000);
      store.dispatch({ type: 'EMAIL_VERIFICATION_SEND_SUCCESS', payload: null });
    }
  }
  submit = (e) => {
    e.preventDefault();
    store.dispatch({ type: 'LOGIN_FAILED', payload: null });
    const { email, emailError } = this.state;
    if (email) {
      resetPasswordAPI.getEmailVerificationCode(email);
    } else {
      let emailError = '';
      if (!email) {
        emailError = 'Field is Required';
      } else if (!validEmailRegex.test(email))
        emailError = 'Please Enter a Valid Email !';
      this.setState({
        emailError,
      });
    }
  };

  render() {
    return (
      <>
        <div className="dark-bl dark-body-reset-password">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Forgot Password</h3>
            <div className="form-instruction">
              <p>
                Don’t worry! Just fill in your email id below and if the Email,
                exists you will receive a verification code in your inbox.
              </p>
            </div>
            <div className="form-container">
              <div className="a5-login-field">
                <input
                  onInput={this.emailHandle}
                  type="text"
                  placeholder="Enter your email"
                />
                <span className="a5-login-error">{this.state.emailError}</span>
              </div>

              <div className="form-btn-holder align-items-center">
                <a
                  onClick={this.submit}
                  className="form-register align-items-center"
                >
                  Request Reset Code
                </a>
              </div>
            </div>
          </div>
          {/* <div className="reset-password">
            <div className="reset-password-description">
              <span>Go back to </span>
              <Link to={'/login'}>Login ?</Link>
            </div>
          </div> */}
          <div className="reset-password-footer">
            <div onClick={() => { window.location.href = "terms/about-us.html" }}>About Us</div>
            <div onClick={() => { window.location.href = "terms/terms-of-use.html" }}>Privacy Policy</div>
            <div onClick={() => { window.location.href = "terms/privacy-policy.html" }}>Terms & Conditions</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { goToResetPasswordForm })(
  withRouter(ResetPassword),
);
