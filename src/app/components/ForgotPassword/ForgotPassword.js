import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './ForgotPassword.css';
import Bitfex_log from '../../../assets/img/bitfex-logo-dark.svg';

class ForgotPassword extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
  }

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
                      <h4>Reset Password</h4>
                      <form>
                        <p>
                          Don’t worry! Just fill in your email id below and you
                          will receive a reset password link in your inbox.
                        </p>
                        <div className="form-group input-ico email">
                          <label htmlFor="emailAddress" className="form-label">
                            Email
                          </label>
                          <input
                            formcontrolname="email"
                            type="email"
                            className="form-input"
                            placeholder="Enter your username or email"
                            maxLength={50}
                          />
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
                          >
                            Request Reset Link
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
                          Support team will share the 2FA recovery procedure
                          with you.
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

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(ForgotPassword));
