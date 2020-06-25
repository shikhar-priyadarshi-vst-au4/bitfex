import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from '../../redux/actions/authActions';
import './Login.css';

const {restUrl} = process.env;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'country',
      email: '',
      password: '',
      emailRequired: '',
      validemail: '',
      passwordRequired: '',
      validPassword: '',
      errors: {
        email: {},
        password: {},
      },
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

  LoginForm = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    if (userData.email === '') {
      this.setState({
        emailRequired: 'Username is required!',
      });
    } else {
      this.setState({
        emailRequired: '',
      });
    }
    if (userData.password === '') {
      this.setState({
        passwordRequired: 'Password is required!',
      });
    } else {
      this.setState({
        passwordRequired: '',
      });
    }
    this.props.loginUser(userData);
  };

  getFormValue = (e) => {
    // if (this.state.password.length < 7) {
    //   this.setState({
    //     validPassword: 'Password should be minimum of 8 characters!',
    //   });
    // } else {
    //   this.setState({
    //     validPassword: '',
    //   });
    // }
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );

    if (e.target.id === '1') {
      if (validEmailRegex.test(e.target.value) === false) {
        this.setState({
          emailRequired: 'Please enter your valid username or email!',
        });
      } else {
        this.setState({
          emailRequired: '',
        });
      }
      if (e.target.value === '') {
        this.setState({
          emailRequired: '',
        });
      }
    }

    if (e.target.id === '2') {
      if (this.state.password === '') {
        this.setState({
          passwordRequired: '',
        });
      }
    }
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    // const {email , password} = this.state;
    // console.log(this.props.errors.type);
    // console.log(this.props.errors);
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
                      <form noValidate onSubmit={this.LoginForm}>
                        {this.props.errors.type ===
                          'password_or_email_invalid' && (
                          <div className="auth-error">
                            <p>Invalid username or password!</p>
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
                            value={this.state.email}
                            onChange={this.getFormValue}
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
                            value={this.state.password}
                            onChange={this.getFormValue}
                          />
                          {/* <div className="form-valid-error">
                      <div>
                        Password is required!
                      </div>
                      <div>
                        Password should be minimum of {'{'}length{'}'} characters!
                      </div>
                    </div> */}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {loginUser})(withRouter(Login));
