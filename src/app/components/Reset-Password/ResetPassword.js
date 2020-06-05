import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Bitfex_log from '../../../assets/img/bitfex-logo-dark.svg';
export class ResetPassword extends Component {
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
                      <h4>Change Password</h4>
                      <form>
                        {/* <div className="auth-error">
                          <p>
                            {'{'}
                            {'{'}error from server{'}'}
                            {'}'}
                          </p>
                        </div> */}
                        <div>
                          <div className="form-group input-ico pwd">
                            <label htmlFor="password" className="form-label">
                              New Password
                            </label>
                            <input
                              className="form-input"
                              formcontrolname="newPassword"
                              type="password"
                              maxLength={20}
                              minLength={8}
                              placeholder="8-20 alpha numeric characters"
                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            />
                            {/* <div className="form-valid-error">
                              <div>Password is required!</div>
                              <div>
                                Password should be minimum of {'{'}
                                {'{'}Length{'}'}
                                {'}'}
                                characters!
                              </div>
                              <div className="error-msg">
                                Your password must contain at least one
                                lowercase letter, one capital letter and one
                                number
                              </div>
                            </div> */}
                          </div>
                          <div className="form-group input-ico pwd">
                            <label htmlFor="password" className="form-label">
                              Confirm Password
                            </label>
                            <input
                              className="form-input"
                              formcontrolname="confirmPassword"
                              type="password"
                              maxLength={20}
                            />
                            {/* <div className="form-valid-error">
                              <div>Confirm password is required!</div>
                              <div>Passwords must match!</div>
                            </div> */}
                          </div>
                          <div className="text-center">
                            <button className="form-button" type="submit">
                              Submit
                            </button>
                          </div>
                        </div>
                        {/* <div className="msg-success">
                          {'{'}
                          {'{'} resetPasswordSuccessMsg {'}'}
                          {'}'}
                        </div> */}
                        <div className="frm-footer">
                          <div className="forgot">
                            Back to <Link to="/login">Log In</Link>
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

export default ResetPassword;
