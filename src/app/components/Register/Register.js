import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { registerUser } from './Register.api';
import { clearErrors } from '../../redux/actions/errorActions';
import { SIGN_UP } from '../../constant';
import EmailVerifiction from '../core/EmailVerifiction';
import './Register.css';
import { validateEmail, validatePassword, checkConfirmPassword, isEmpty, isNotEmpty } from '../../utils/validate'

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'country',
      email: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
      country: '',
      formError: '',
      emailError: '',
      passError: '',
      cnfPassError: '',
      countryError: '',
      firstNameError: '',
      lastnameError: '',
      emailtakenerror: '',
      registerData: this.props.auth.registerInfo || {},
      openTransferBalModal: false,
    };
  }

  errorMap = {
    password_or_email_invalid: 'User Registration fail.',
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors.type === 'validation') {
      this.setState({ formError: 'The email has already been taken!' });
    }
    if (nextProps.errors.type === 'forbidden') {
      this.setState({ formError: 'Server err please try again later!' });
    }
    if (!isEmpty(nextProps.auth.registerInfo)) {
      this.setState({ registerData: nextProps.auth.registerInfo });
      this.showTransferBalanceModal();
    }
    if (!isEmpty(nextProps.auth.sendEmail)) {
      this.setState({ successmsg: 'Email Verification code sent successfully' });
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (newState.formError) {
      setTimeout(() => {
        this.setState({ formError: '' });
      }, 3000);
    }
  };

  allowSubmission = () => {
    const {
      emailError,
      passError,
      cnfPassError,
      countryError,
      firstNameError,
      lastnameError,
      formError,
      isDirty,
    } = this.state;
    return (
      !(
        emailError ||
        passError ||
        cnfPassError ||
        countryError ||
        firstNameError ||
        lastnameError ||
        formError
      ) && isDirty
    );
  };

  registerForm = (e) => {
    e.preventDefault();
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      country,
    } = this.state;
    if (
      this.allowSubmission() &&
      isNotEmpty(email) &&
      isNotEmpty(password) &&
      isNotEmpty(password_confirmation) &&
      isNotEmpty(first_name) &&
      isNotEmpty(last_name) &&
      isNotEmpty(country)
    ) {
      this.props.registerUser({
        email,
        password,
        password_confirmation,
        first_name,
        last_name,
        country,
      });
    } else {
      this.setState({
        emailError: validateEmail(email),
        passError: validatePassword(password),
        cnfPassError: isEmpty(password_confirmation) ? 'Please enter confirm password!' : "",
        countryError: isEmpty(country) ? 'Please choose a country!' : "",
        firstNameError: isEmpty(first_name) ? 'First Name is required!' : "",
        lastnameError: isEmpty(last_name) ? 'last Name is required!' : "",
        email,
        formError: '',
        isDirty: true,
      });
    }
  };

  handleEmailInput = (e) => {
    e.preventDefault();
    let email = e.target.value;
    this.props.clearErrors();
    this.setState({ emailError: validateEmail(email), email, formError: '', isDirty: true });
  };

  handlePasswordInput = (e) => {
    e.preventDefault();
    let password = e.target.value;
    this.props.clearErrors();
    this.setState({ password, passError: validatePassword(password), formError: '', isDirty: true });
  };

  handleCnfrmPasswordInput = (e) => {
    e.preventDefault();
    let password_confirmation = e.target.value;
    const { password } = this.state;
    this.props.clearErrors();
    this.setState({
      password_confirmation,
      cnfPassError: checkConfirmPassword(password, password_confirmation),
      formError: '',
      isDirty: true,
    });
  };

  handleContryChange = (e) => {
    e.preventDefault();
    let country = e.target.value;
    this.props.clearErrors();
    this.setState({ country, countryError: isEmpty(country) ? 'Please choose a country!' : "", formError: '', isDirty: true });
  };

  handleFirstNameInput = (e) => {
    e.preventDefault();
    let first_name = e.target.value;
    this.props.clearErrors();
    this.setState({ firstNameError: isEmpty(first_name) ? 'First Name is required!' : "", first_name, formError: '', isDirty: true });
  };

  handleLastnameInput = (e) => {
    e.preventDefault();
    let last_name = e.target.value;
    this.props.clearErrors();
    this.setState({ lastnameError: isEmpty(last_name) ? 'last Name is required!' : "", last_name, formError: '', isDirty: true });
  };

  showTransferBalanceModal = (e) => {
    this.setState({ openTransferBalModal: true });
  };

  hideTransferBalanceModal = () => {
    this.setState({ openTransferBalModal: false });
  };

  render() {
    // console.log(this.props.errors.email);
    console.log(SIGN_UP);

    return (
      <div>
        <div>
          <div className="wrapper">
            <div className="frm-wrapper register">
              <section className="frm-block">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="frm-outer">
                        <ul className="frm-tabs">
                          <li>
                            <Link to="/login">Login</Link>
                          </li>
                          <li>
                            <Link to="/register" className="active">
                              Register
                            </Link>
                          </li>
                        </ul>
                        <div className="frm-body signin-wd">
                          <form onSubmit={this.registerForm}>
                            {this.state.formError ? (
                              <h3 className="auth-error">
                                {this.state.formError}
                              </h3>
                            ) : null}
                            <div className="login-signup-heading">
                              Create Bitfex Account
                            </div>
                            <div className="form-group input-ico email">
                              <label
                                htmlFor="emailAddress"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                formcontrolname="email"
                                type="email"
                                name="email"
                                id="email"
                                className={classnames('form-input', {
                                  'is-invalid': this.state.emailError,
                                })}
                                maxLength="{50}"
                                onInput={this.handleEmailInput}
                              />
                              {this.state.emailError && (
                                <div className="invalid-feedback">
                                  {this.state.emailError}
                                </div>
                              )}
                            </div>
                            <div className="form-group input-ico pwd">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                formcontrolname="password"
                                type="password"
                                name="password"
                                className={classnames('form-input', {
                                  'is-invalid': this.state.passError,
                                })}
                                placeholder="8-20 alpha numeric characters"
                                maxLength="{20}"
                                minLength="{8}"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onInput={this.handlePasswordInput}
                              />
                              {this.state.passError && (
                                <div className="invalid-feedback">
                                  {this.state.passError}
                                </div>
                              )}
                            </div>
                            <div className="form-group input-ico pwd">
                              <label htmlFor="password" className="form-label">
                                Confirm Password
                              </label>
                              <input
                                formcontrolname="confirmPassword"
                                type="password"
                                name="password_confirmation"
                                className={classnames('form-input', {
                                  'is-invalid': this.state.cnfPassError,
                                })}
                                placeholder="8-20 alpha numeric characters"
                                maxLength="{20}"
                                minLength="{8}"
                                onInput={this.handleCnfrmPasswordInput}
                              />
                              {this.state.cnfPassError && (
                                <div className="invalid-feedback">
                                  {this.state.cnfPassError}
                                </div>
                              )}
                            </div>
                            <div className="form-group input-ico globe">
                              <label
                                htmlFor="countrySelector"
                                className="form-label"
                              >
                                Country of Residence
                              </label>
                              <div className="select-wrap">
                                <select
                                  formcontrolname="country"
                                  name="country"
                                  className={classnames('form-input', {
                                    'is-invalid': this.state.countryError,
                                  })}
                                  onChange={this.handleContryChange}
                                >
                                  <option value={this.state.value}>
                                    Click to choose a Country
                                  </option>
                                  <option value="2">India</option>
                                  <option value="3">Bangladesh</option>
                                  <option value="4">Pakistan</option>
                                  <option value="5">Australia</option>
                                  <option value="6">China</option>
                                </select>
                                {this.state.countryError && (
                                  <div className="invalid-feedback">
                                    {this.state.countryError}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="form-group input-ico user">
                              <label htmlFor="username" className="form-label">
                                First Name
                              </label>
                              <input
                                formcontrolname="firstName"
                                name="first_name"
                                type="text"
                                className={classnames('form-input', {
                                  'is-invalid': this.state.firstNameError,
                                })}
                                maxLength="{30}"
                                onInput={this.handleFirstNameInput}
                              />
                              {this.state.firstNameError && (
                                <div className="invalid-feedback">
                                  {this.state.firstNameError}
                                </div>
                              )}
                            </div>
                            <div className="form-group input-ico user">
                              <label htmlFor="username" className="form-label">
                                Last Name
                              </label>
                              <input
                                formcontrolname="lastName"
                                name="last_name"
                                type="text"
                                className={classnames('form-input', {
                                  'is-invalid': this.state.lastnameError,
                                })}
                                maxLength="{30}"
                                onInput={this.handleLastnameInput}
                              />
                              {this.state.lastnameError && (
                                <div className="invalid-feedback">
                                  {this.state.lastnameError}
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <div className="terms-wrapper">
                                <div
                                  data-style="check"
                                  className="cust-control"
                                >
                                  <input
                                    type="checkbox"
                                    formcontrolname="terms"
                                    id="checkbox1.1"
                                    defaultChecked
                                  />
                                  <label htmlFor="checkbox1.1">
                                    <i></i>
                                  </label>
                                </div>
                                <div className="label-control">
                                  I accept the
                                  <a
                                    target="_blank"
                                    href="assets/terms-of-use.html"
                                  >
                                    Terms of Service.
                                  </a>
                                </div>
                                {/* <div className="form-valid-error">
                                      <div className="error-msg">
                                        Please accept terms of service!
                                      </div>
                                    </div> */}
                              </div>
                            </div>
                            <div className="form-group row ng-captcha-container">
                              Google captcha comes below
                              {/* <div className="form-valid-error">
                                    <div>
                                      Please confirm you are not a robot!
                                    </div>
                                  </div> */}
                            </div>
                            <div className="text-center">
                              <button className="form-button create-account">
                                Create My Account
                              </button>
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
        </div>
        {this.state.registerData != '' ? (
          <EmailVerifiction
            show={this.state.openTransferBalModal}
            onHide={this.hideTransferBalanceModal}
            resendCategory={SIGN_UP}
          />
        ) : null}
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  withRouter(Register),
);
