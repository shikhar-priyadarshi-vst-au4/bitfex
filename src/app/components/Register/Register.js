import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Register.css';
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'country'};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  }

  render() {
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
                          <form>
                            {/* <div className="auth-error">
                              <p>error</p>
                            </div> */}
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
                                className="form-input"
                                maxLength="{50}"
                              />
                              {/* <div className="form-valid-error">
                                <div className="error-msg">
                                  Please enter valid email address!
                                </div>
                                <div className="error-msg">
                                  Email is required!
                                </div>
                              </div> */}
                            </div>
                            <div className="form-group input-ico pwd">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                formcontrolname="password"
                                type="password"
                                className="form-input"
                                placeholder="8-20 alpha numeric characters"
                                maxLength="{20}"
                                minLength="{8}"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                              />
                              {/* <div className="form-valid-error">
                                <div className="error-msg">
                                  Please enter your password!
                                </div>
                                <div className="error-msg">
                                  Password should be minimum of min 8
                                  characters!
                                </div>
                                <div className="error-msg">
                                  Your password must contain at least one
                                  lowercase letter, one capital letter and one
                                  number!
                                </div>
                              </div> */}
                            </div>
                            <div className="form-group input-ico pwd">
                              <label htmlFor="password" className="form-label">
                                Confirm Password
                              </label>
                              <input
                                formcontrolname="confirmPassword"
                                type="password"
                                className="form-input"
                                placeholder="8-20 alpha numeric characters"
                                maxLength="{20}"
                                minLength="{8}"
                              />
                              {/* <div className="form-valid-error">
                                <div className="error-msg">
                                  Please enter confirm password!
                                </div>
                                <div className="error-msg">
                                  Password must match!
                                </div>
                              </div> */}
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
                                  className="form-input"
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
                                {/* <div className="form-valid-error">
                                  <div className="error-msg">
                                    Please choose a country!
                                  </div>
                                </div> */}
                              </div>
                            </div>
                            <div className="form-group input-ico user">
                              <label htmlFor="username" className="form-label">
                                First Name
                                <span>(Optional)</span>
                              </label>
                              <input
                                formcontrolname="firstName"
                                type="text"
                                className="form-input"
                                maxLength="{30}"
                              />
                            </div>
                            <div className="form-group input-ico user">
                              <label htmlFor="username" className="form-label">
                                Last Name
                                <span>(Optional)</span>
                              </label>
                              <input
                                formcontrolname="lastName"
                                type="text"
                                className="form-input"
                                maxLength="{30}"
                              />
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
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Register));
