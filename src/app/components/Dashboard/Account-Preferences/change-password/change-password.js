import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearErrors} from '../../../../redux/actions/errorActions';
import ConfirmPasswordChangeModal from './passwordUpdateModal';
import {
  changePassword,
  resetChangePassword,
} from '../../../../redux/actions/authActions';

const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

class ChangePassword extends Component {
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
      passwordChanged: false,
      secret_key_2fa: '',
      mfa_for_enabling: '',
    };
  }

  errorMap = {
    password_or_email_invalid: 'Invalid Email or Password!',
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.passwordChanged && !this.state.passwordChanged) {
      this.setState({passwordChanged: true});
      setTimeout(() => {
        this.props.resetChangePassword(false);
      }, 3000);
    } else if (!nextProps.auth.passwordChanged && this.state.passwordChanged) {
      this.setState({passwordChanged: false});
    }
    if (nextProps.errors.type) {
      this.setState({formError: this.errorMap[nextProps.errors.type]});
    }
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

  oldPasswordChange = (e) => {
    e.preventDefault();
    let old_password = e.target.value;
    let oldPasswordError = '';
    if (!old_password) {
      oldPasswordError = 'Please enter your current password!';
    }
    this.props.clearErrors();
    this.setState({old_password, oldPasswordError, formError: ''});
  };

  newPasswordChange = (e) => {
    e.preventDefault();
    let password = e.target.value;
    const {password_confirmation} = this.state;
    let newPasswordError = '';
    let confirmNewPasswordError = '';
    if (!password) {
      newPasswordError = 'Please enter your password!';
    } else if (password.length < 8) {
      newPasswordError = 'Password should be minimum of min 8 characters!';
    } else if (!validPassword.test(password)) {
      newPasswordError =
        'Your password must contain at least one lowercase letter, one capital letter, one special character and one number!';
    }

    this.props.clearErrors();
    this.setState({
      password,
      newPasswordError,
      formError: '',
    });
  };

  confirmpasswordChange = (e) => {
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

  getHeading = () => {
    if (this.state.passwordChanged)
      return <h3 className="text-success">Password Changed Successfully !</h3>;
    else if (!this.state.formError) return <h3>Change Password</h3>;
    else if (this.state.formError)
      return <h3 className="text-danger">{this.state.formError}</h3>;
  };

  onSubmit = (e) => {
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

  render() {
    return (
      <>
        <div className="main">
          <div className="main-header">
            <h3>Account & Preferences</h3>
            <div className="main-sub-header">
              Change Password
              <hr />
            </div>
          </div>
          <div className="main-body">
            <div className="form-body white-bg">
              {this.getHeading()}
              <div className="form-container">
                <div className="a5-login-field">
                  <input
                    onInput={this.oldPasswordChange}
                    type="password"
                    placeholder="Old Password"
                  />
                  <span className="a5-login-error">
                    {this.state.oldPasswordError}
                  </span>
                </div>
                <div className="a5-login-field">
                  <input
                    onInput={this.newPasswordChange}
                    type="password"
                    placeholder="New Password"
                  />
                  <span className="a5-login-error">
                    {this.state.newPasswordError}
                  </span>
                </div>
                <div className="a5-login-field">
                  <input
                    onInput={this.confirmpasswordChange}
                    type="password"
                    placeholder="Confirm New Password"
                  />
                  <span className="a5-login-error">
                    {this.state.confirmNewPasswordError}
                  </span>
                </div>
                <div className="form-btn-holder align-items-center mt-5">
                  <a
                    onClick={this.onSubmit}
                    className="form-register align-items-center"
                  >
                    Change Password
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  clearErrors,
  changePassword,
  resetChangePassword,
})(ChangePassword);
