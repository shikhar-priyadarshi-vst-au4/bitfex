import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {registerUser} from '../../redux/actions/authActions';
import {clearErrors} from '../../redux/actions/errorActions';
import isEmpty from '../../validation/is-empty';
import EmailVerifiction from '../Model/EmailVerifiction';
import './Register.css';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

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
      this.setState({formError: 'The email has already been taken!'});
    }
    if (nextProps.errors.type === 'forbidden') {
      this.setState({formError: 'Server err please try again later!'});
    }
    console.log(nextProps.auth);
    if (!isEmpty(nextProps.auth.registerInfo)) {
      this.setState({registerData: nextProps.auth.registerInfo});
      this.showTransferBalanceModal();
    }
    if (nextProps.auth.isAuthenticated) {
      // this.props.history.push('/dashboard/account');
    }

    // } else if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard/account');
    // }
  };

  componentDidUpdate = () => {};

  componentWillUpdate = (newProps, newState) => {
    if (newState.formError) {
      setTimeout(() => {
        this.setState({formError: ''});
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
      email != '' &&
      password != '' &&
      password_confirmation != '' &&
      first_name != '' &&
      last_name != '' &&
      country != ''
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
      let emailError = '';
      let passError = '';
      let cnfPassError = '';
      let countryError = '';
      let firstNameError = '';
      let lastnameError = '';

      if (!email) {
        emailError = 'Email is Required !';
      } else if (!validEmailRegex.test(email)) {
        emailError = 'Please enter a valid email!';
      }
      if (!password) {
        passError = 'Password is required !';
      }
      if (!password_confirmation) {
        cnfPassError = 'Please enter confirm password!';
      }
      if (!country) {
        countryError = 'Please choose a country!';
      }
      if (!first_name) {
        firstNameError = 'First Name is required!';
      }
      if (!last_name) {
        lastnameError = 'last Name is required!';
      }
      this.setState({
        emailError,
        passError,
        cnfPassError,
        countryError,
        firstNameError,
        lastnameError,
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

  handleContryChange = (e) => {
    e.preventDefault();
    let country = e.target.value;
    let countryError = '';
    if (!country) {
      countryError = 'Please choose a country!';
    }
    this.props.clearErrors();
    this.setState({country, countryError, formError: '', isDirty: true});
  };

  handleFirstNameInput = (e) => {
    e.preventDefault();
    let first_name = e.target.value;
    let firstNameError = '';
    if (!first_name) {
      firstNameError = 'First Name is required!';
    }
    this.props.clearErrors();
    this.setState({firstNameError, first_name, formError: '', isDirty: true});
  };

  handleLastnameInput = (e) => {
    e.preventDefault();
    let last_name = e.target.value;
    let lastnameError = '';
    if (!last_name) {
      lastnameError = 'last Name is required!';
    }
    this.props.clearErrors();
    this.setState({lastnameError, last_name, formError: '', isDirty: true});
  };

  showTransferBalanceModal = (e) => {
    this.setState({openTransferBalModal: true});
  };

  hideTransferBalanceModal = () => {
    this.setState({openTransferBalModal: false});
  };

  render() {
    // console.log(this.props.errors.email);
    console.log(this.state.registerData);

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

export default connect(mapStateToProps, {registerUser, clearErrors})(
  withRouter(Register),
);
