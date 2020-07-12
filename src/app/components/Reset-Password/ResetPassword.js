import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

export class ResetPassword extends Component {
  render() {
    return (
      <>
        <div className="dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Reset Password</h3>
            <div className="form-instruction">
              <p>
                Don’t worry! Just fill in your email id below and you will
                receive a reset password link in your inbox.
              </p>
            </div>
            <div className="form-container">
              <div className="a5-login-field">
                <input type="text" placeholder="Enter your email" />
              </div>

              <div className="form-btn-holder align-items-center">
                <a className="form-register align-items-center">Send</a>
              </div>
            </div>
          </div>
          <div className="reset-password">
            <div className="reset-password-description">
              <span>Go back to </span>
              <Link to={'/login'}>Sign In</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ResetPassword;
