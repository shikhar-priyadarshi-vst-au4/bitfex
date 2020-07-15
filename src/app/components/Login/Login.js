import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from '../../redux/actions/authActions';
import {clearErrors} from '../../redux/actions/errorActions';
import './Login.css';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'country',
      email: '',
      password: '',
      token_2fa: '',
      emailRequired: '',
      passwordRequired: '',
      formError: '',
      isDirty: false,
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }

    // if (nextProps.errors) {
    //   this.setState({errors: nextProps.errors});
    // }
  }

  allowSubmission = () => {
    const {emailRequired, passwordRequired, isDirty} = this.state;
    return !(emailRequired || passwordRequired) && isDirty;
  };

  LoginForm = (e) => {
    e.preventDefault();
    const {email, password, token_2fa} = this.state;
    console.log(token_2fa);
    if (this.allowSubmission()) {
      this.props.loginUser(email, password, token_2fa);
    } else {
      let emailRequired = '';
      let passwordRequired = '';

      if (!email) {
        emailRequired = 'Email is Required !';
      } else if (!validEmailRegex.test(email)) {
        emailRequired = 'Please enter a valid email!';
      }
      if (!password) {
        passwordRequired = 'Password is required !';
      }
      this.setState({
        emailRequired,
        passwordRequired,
        email,
        formError: '',
        isDirty: true,
      });
    }
  };

  handleEmailInput = (e) => {
    e.preventDefault();
    let email = e.target.value;
    let emailRequired = '';
    if (!email) {
      emailRequired = 'Email is Required !';
    } else if (!validEmailRegex.test(email)) {
      emailRequired = 'Please enter a valid email!';
    }
    this.props.clearErrors();
    this.setState({emailRequired, email, formError: '', isDirty: true});
  };

  handlePasswordInput = (e) => {
    e.preventDefault();
    let password = e.target.value;
    let passwordRequired = '';
    if (!password) {
      passwordRequired = 'Password is required !';
    }
    this.props.clearErrors();
    this.setState({password, passwordRequired, formError: '', isDirty: true});
  };

  twoFectorcode = (e) => {
    e.preventDefault();
    let token_2fa = e.target.value;
    console.log(token_2fa);
    this.setState({token_2fa, formError: '', isDirty: true});
  };

  render() {
    // const {email , password} = this.state;
    // console.log(this.props.errors.type);
    console.log(this.props.errors);
    // console.log(this.state.token_2fa);
    return (
      <div className="wrapper">
        <div className="frm-wrapper">
          <section className="frm-block">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="frm-outer">
                    <ul className="frm-tabs">
                      <li>
                        <Link to="/login" className="active">
                          Log In
                        </Link>
                      </li>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                    </ul>
                    <div className="frm-body">
                      {this.props.errors.type ===
                        'password_or_email_invalid' && (
                        <div className="auth-error">
                          <p>Invalid username or password!</p>
                        </div>
                      )}{' '}
                      {this.props.errors.type === 'invalid_data' && (
                        <div className="auth-error">
                          <p>
                            The Google Authenticator code is incorrect or has
                            expired!!
                          </p>
                        </div>
                      )}
                      <div className="form-group input-ico email">
                        <label htmlFor="emailAddress" className="form-label">
                          Email
                        </label>
                        <input
                          // className="form-input"
                          className={classnames('form-input', {
                            'is-invalid': this.state.emailRequired,
                          })}
                          name="email"
                          id="1"
                          type="email"
                          maxLength={50}
                          onInput={this.handleEmailInput}
                        />
                        {this.state.emailRequired && (
                          <div className="invalid-feedback">
                            {this.state.emailRequired}
                          </div>
                        )}
                      </div>
                      <div className="form-group input-ico pwd">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          // className="form-input"
                          className={classnames('form-input', {
                            'is-invalid': this.state.passwordRequired,
                          })}
                          name="password"
                          id="2"
                          type="password"
                          maxLength={20}
                          onInput={this.handlePasswordInput}
                        />
                        {this.state.passwordRequired && (
                          <div className="invalid-feedback">
                            {this.state.passwordRequired}
                          </div>
                        )}
                      </div>
                      <div className="form-group input-ico ga">
                        <label className="form-label">
                          Two-Factor Code (if enabled)
                        </label>
                        <input
                          type="text"
                          formcontrolname="factorCode"
                          className="form-input"
                          placeholder="Google Authenticator"
                          maxLength={6}
                          onInput={this.twoFectorcode}
                        />
                      </div>
                      <div className="form-group row ng-captcha-container">
                        {/* Google Captcha here */}
                        {/* <div className="form-valid-error">
                      <div>
                        Please confirm you are not a robot!
                      </div>
                    </div> */}
                      </div>
                      <div className="text-center">
                        <button
                          className="form-button login-btn"
                          type="submit"
                          onClick={this.LoginForm}
                        >
                          Log In
                        </button>
                      </div>
                      <div className="frm-footer">
                        <div className="sign">
                          <Link to="/forgot">
                            {' '}
                            Forgot Password or Two-Factor Device?
                          </Link>
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
