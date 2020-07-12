import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {loginUser} from '../../redux/actions/authActions';
import './Login.css';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {clearErrors} from '../../redux/actions/errorActions';
import PropTypes from 'prop-types';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      passwordError: '',
      formError: '',
      value: 'country',
      email: '',
      password: '',
      isDirty: false,
    };
  }

  errorMap = {
    password_or_email_invalid: 'Incorrect Email or Password!',
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (!isEmpty(nextProps.errors)) {
      console.log(nextProps.errors);
    } else if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  };

  componentDidUpdate = () => {
    if (!isEmpty(this.props.errors) && !this.state.formError) {
      let formError = this.errorMap[this.props.errors.type];
      this.setState({formError});
    }
  };

  allowSubmission = () => {
    const {emailError, passwordError, isDirty} = this.state;
    return !(emailError || passwordError) && isDirty;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    if (this.allowSubmission()) {
      this.props.loginUser({email, password});
    } else {
      let emailError = '';
      let passwordError = '';
      if (!email) {
        emailError = 'Email is Required !';
      } else if (!validEmailRegex.test(email)) {
        emailError = 'Please enter a valid email!';
      }
      if (!password) {
        passwordError = 'Password is required !';
      }
      this.setState({
        emailError,
        passwordError,
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

  handlePasswordInput = (e) => {
    e.preventDefault();
    let password = e.target.value;
    let passwordError = '';
    if (!password) {
      passwordError = 'Password is required !';
    }
    this.props.clearErrors();
    this.setState({password, passwordError, formError: '', isDirty: true});
  };

  render() {
    return (
      <>
        <div className="dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Sign in to your account</h3>
            {this.state.formError ? (
              <h3 className="error">{this.state.formError}</h3>
            ) : (
              <></>
            )}
            <div className="form-container">
              <div className="a5-login-field">
                <input
                  onInput={this.handleEmailInput}
                  type="text"
                  placeholder="Email"
                />
                <span className="a5-login-error">{this.state.emailError}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.handlePasswordInput}
                  type="password"
                  placeholder="Password"
                />
                <span className="a5-login-error">
                  {this.state.passwordError}
                </span>
              </div>
              <div className="form-btn-holder align-items-center">
                <a
                  onClick={this.onSubmit}
                  className="form-register align-items-center"
                >
                  LOGIN
                </a>
                <div className="already">
                  <span>Don't have an account?</span> <br />
                  <Link to="/register">REGISTER</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="reset-password">
            <div className="reset-password-description">
              <span>Trouble signing in ? </span>
              <Link to={'reset-password'}> Forgot Password</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {loginUser, clearErrors})(
  withRouter(Login),
);
