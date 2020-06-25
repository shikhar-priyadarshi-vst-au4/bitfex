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
      <>
        <div className="dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Sign in to your account</h3>
            <div className="form-container">
              <div className="a5-login-field">
                <input type="text" placeholder="Email" />
              </div>
              <div className="a5-login-field">
                <input type="text" placeholder="Password" />
              </div>
              <div className="form-btn-holder align-items-center mt-5">
                <Link
                  className="form-register align-items-center"
                  to="/dashboard"
                >
                  LOGIN
                </Link>
                <div className="already">
                  <span>Don't have an account?</span> <br />
                  <Link to="/register">REGISTER</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
