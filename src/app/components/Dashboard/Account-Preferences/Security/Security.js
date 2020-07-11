import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {changePassword} from '../../../../redux/actions/authActions';
import isEmpty from '../../../../validation/is-empty';
import cromeimg from '../../../../../assets/img/cromeimg.png';
import GoogleAuthSVG from '../../../../../assets/img/._google-authenticator.svg';
import './Security.css';

const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      password: '',
      password_confirmation: '',
      successmsg: '',
      oldPasswordError: '',
      newPasswordError: '',
      confirmNewPasswordError: '',
      formError: '',
      isDirty: false,
    };
  }

  errorMap = {
    password_dose_not_match: 'Current password does not match!',
  };

  // successmap = {
  //   succefully_password_update: 'Your password was successfully updated!',
  // };

  componentDidMount() {
    // this.props.setCurrentUser();
    // if (this.props.auth.isAuthenticated) {
    //   document.title = this.props.auth.user.email;
    // }
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
      document.title = 'Bitfex';
    }
    this.setState({successmsg: nextProps.auth.userNewpasswor});
  }

  componentDidUpdate = () => {
    if (!isEmpty(this.props.errors) && !this.state.formError) {
      let formError = this.errorMap[this.props.errors.type];
      this.setState({formError});
    }
    // if (!isEmpty(this.props.auth.userNewpasswor)) {
    //   let successmsg = this.successmap[this.props.auth.userNewpasswor];
    //   this.setState({successmsg});
    // }
  };

  allowSubmission = () => {
    const {
      oldPasswordError,
      newPasswordError,
      confirmNewPasswordError,
      isDirty,
    } = this.state;
    return (
      !(oldPasswordError || newPasswordError || confirmNewPasswordError) &&
      isDirty
    );
  };

  upadtePassword = (e) => {
    e.preventDefault();
    const {old_password, password, password_confirmation} = this.state;
    if (this.allowSubmission()) {
      this.props.changePassword({
        old_password,
        password,
        password_confirmation,
      });
    } else {
      let oldPasswordError = '';
      let newPasswordError = '';
      let confirmNewPasswordError = '';
      if (!old_password) {
        oldPasswordError = 'Please enter your current password!';
      }
      if (!password) {
        newPasswordError = 'Please enter your password!';
      }
      if (!password_confirmation) {
        confirmNewPasswordError = 'Please enter confirm password!';
      }
      this.setState({
        oldPasswordError,
        newPasswordError,
        confirmNewPasswordError,
        formError: '',
        isDirty: true,
      });
    }
  };

  oldPassword = (e) => {
    e.preventDefault();
    // alert('call');
    let old_password = e.target.value;
    let oldPasswordError = '';
    if (!old_password) {
      oldPasswordError = 'Please enter your current password!';
    }
    // else if (oldPassword.length < 8) {
    //   oldPasswordError = 'Password should be minimum of min 8 characters!';
    // }
    this.props.clearErrors();
    this.setState({old_password, oldPasswordError, formError: ''});
  };

  newPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    const {password_confirmation} = this.state;
    let newPasswordError = '';
    let confirmNewPasswordError = '';
    if (!password) {
      newPasswordError = 'Please enter your password!';
      // confirmNewPasswordError = 'Password must match!';
    } else if (password.length < 8) {
      newPasswordError = 'Password should be minimum of min 8 characters!';
    } else if (!validPassword.test(password)) {
      newPasswordError =
        'Your password must contain at least one lowercase letter, one capital letter, one special character and one number!';
    }
    // else if (newPassword !== confirmNewPassword) {
    //   confirmNewPasswordError = 'Password must match!';
    // }
    this.props.clearErrors();
    this.setState({
      password,
      newPasswordError,
      formError: '',
    });
  };

  confirmpassword = (e) => {
    e.preventDefault();
    let password_confirmation = e.target.value;
    const {password} = this.state;
    let confirmNewPasswordError = '';
    if (!password_confirmation) {
      confirmNewPasswordError = 'Please enter confirm password!';
    } else if (password_confirmation !== password) {
      confirmNewPasswordError = 'Password must match!';
    }
    this.props.clearErrors();
    this.setState({
      password_confirmation,
      confirmNewPasswordError,
      formError: '',
    });
  };

  render() {
    const Profile = this.props.heading;
    console.log(this.props);
    console.log(this.state.successmsg);
    return (
      <div className="row dashboard_container">
        <div className="col-md-12 contentcontainer">
          <div className="wallet_container">
            <h4 className="content_heading">{Profile}</h4>
            <p className="preferences_account">
              ACCOUNT &amp; PREFERENCES / <span>{Profile.toUpperCase()}</span>
            </p>
            <div className="row account_detail">
              <div className="col-md-6 my_profilediv">
                <div className="user_accountdetail">
                  <h4 className="account_tableheading">
                    Change Login Password
                  </h4>
                  {this.state.formError && (
                    <div className="auth-error">
                      <p>{this.state.formError}</p>
                    </div>
                  )}
                  {/* {this.state.successmsg && (
                    <div className="msg-success">
                      <p>Your password was successfully updated!</p>
                    </div>
                  )} */}
                  <div className="security_from">
                    <label>Current Password</label>
                    <div className="inputWithIcon">
                      <input
                        type="password"
                        onInput={this.oldPassword}
                        name="old_password"
                      />
                      <i className="fa fa-lock" />
                    </div>
                    <span className="error-msg">
                      {this.state.oldPasswordError}
                    </span>
                  </div>
                  <div className="security_from">
                    <label>Password</label>
                    <div className="inputWithIcon">
                      <input
                        type="password"
                        placeholder="8-20 alpha numeric characters"
                        onInput={this.newPassword}
                        name="password"
                      />
                      <i className="fa fa-lock" />
                    </div>
                    <span className="error-msg">
                      {this.state.newPasswordError}
                    </span>
                  </div>
                  <div className="security_from">
                    <label>Confirm Password</label>
                    <div className="inputWithIcon">
                      <input
                        type="password"
                        placeholder="8-20 alpha numeric characters"
                        onInput={this.confirmpassword}
                        name="password_confirmation"
                      />
                      <i className="fa fa-lock" />
                    </div>
                    <span className="error-msg">
                      {this.state.confirmNewPasswordError}
                    </span>
                  </div>
                  <button
                    className="update_button"
                    onClick={this.upadtePassword}
                  >
                    Update Password
                  </button>
                </div>
              </div>
              <div className="col-md-6 google_container">
                <div className="row googleauth_container">
                  <div className="col-md-8 google_auth">
                    <div className="auth_text">
                      {/* <img src="images/cromeimg.png" className="crome_image" /> */}
                      <img src={cromeimg} className="crome_image" />
                      <h3>Google Auth (2FA)</h3>
                    </div>
                  </div>
                  <div className="col-md-4 enable_button">
                    <button>Enalbe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

changePassword.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {clearErrors, changePassword})(
  Security,
);
