import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Login.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'country'};

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.push('/dashboard/account');
    // const userData = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };

    // this.props.loginUser(userData);
  }

  render() {
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
                      <form onSubmit={this.onSubmit}>
                        {/* <div className="auth-error">
                    <p>{'{'}error from server{'}'}</p>
                  </div> */}
                        <div className="form-group input-ico email">
                          <label htmlFor="emailAddress" className="form-label">
                            Email
                          </label>
                          <input
                            className="form-input"
                            formcontrolname="email"
                            type="text"
                            maxLength={50}
                          />
                          {/* <div className="form-valid-error">
                      <div className="error-msg">
                        Please enter your valid username or email!
                      </div>
                      <div className="error-msg">
                        Username is required!
                      </div>
                    </div> */}
                        </div>
                        <div className="form-group input-ico pwd">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            className="form-input"
                            formcontrolname="password"
                            type="password"
                            maxLength={20}
                          />
                          {/* <div className="form-valid-error">
                      <div>
                        Password is required!
                      </div>
                      <div>
                        Password should be minimum of {'{'}length{'}'} characters!
                      </div>
                    </div> */}
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

export default withRouter(Login);
