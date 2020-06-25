import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Register.css';
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'country'};
  }

  render() {
    return (
      <>
        <div className="vh-100 dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Create an account</h3>
            <div className="form-container">
              <div className="a5-login-field">
                <input type="text" placeholder="Email" />
              </div>
              <div className="a5-login-field">
                <input type="password" placeholder="Password" />
              </div>
              <div className="a5-login-field">
                <input type="password" placeholder="Confirm Password" />
              </div>
              <div className="a5-login-field">
                <input type="text" placeholder="Select Country" />
              </div>
              <div className="agreement">
                <label className="a5-checkbox">
                  <span className="i-agree-text">
                    I Agree To The<a href="#">Terms of Service</a>
                  </span>
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="form-btn-holder align-items-center">
                <a className="form-register align-items-center" href="#">
                  REGISTER
                </a>
                <div className="already">
                  <span>Already have an account?</span> <br />
                  <Link to="/login">LOGIN</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
