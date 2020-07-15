import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {changePassword} from '../../../../redux/actions/authActions';
import {setTwoFAKey} from '../../../../redux/actions/apiSecretand2faAction';
import isEmpty from '../../../../validation/is-empty';
import cromeimg from '../../../../../assets/img/cromeimg.png';
import GoogleAuthSVG from '../../../../../assets/img/._google-authenticator.svg';
import scanimg from '../../../../../assets/img/scanimg.png';
import inputimg from '../../../../../assets/img/inputimg.png';
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
      oldPasswordError: '',
      newPasswordError: '',
      confirmNewPasswordError: '',
      formError: '',
      isDirty: false,
      googletwofakey: '',
      token_2fa: '',
      enabled_2fa: '',
      token_2faError: '',
      successmsg: this.props.apisecretkeys.twofastatu,
      errmsg: '',
      token_2fForm: false,
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
    if (!isEmpty(this.props.errors)) {
      this.setState({enabled_2fa: false});
    }
    if (!isEmpty(this.props.apisecretkeys.twofakey)) {
      this.setState({enabled_2fa: true});
      this.setState({
        googletwofakey: this.props.apisecretkeys.twofakey.secret_key_2fa,
      });
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
      document.title = 'Bitfex';
    }
    this.setState({successmsg: nextProps.auth.userNewpasswor});
    if (!isEmpty(nextProps.apisecretkeys.twofakey)) {
      this.setState({enabled_2fa: true});
      this.setState({
        googletwofakey: nextProps.apisecretkeys.twofakey.secret_key_2fa,
      });
    }
    if (nextProps.apisecretkeys.twofastatus === true) {
      this.setState({
        successmsg: 'You Google auth (2FA) has been enabled successfully!',
      });
    } else if (nextProps.apisecretkeys.twofastatus === false) {
      this.setState({
        successmsg: 'You Google auth (2FA) has been disabled successfully!',
      });
    }
    if (!isEmpty(nextProps.errors.type)) {
      this.setState({enabled_2fa: false});
      // this.setState({
      //   googletwofakey: '0',
      // });
    }
    if (nextProps.errors.type === 'invalid_data') {
      // this.setState({
      //   errmsg: 'The Google Authenticator code is incorrect or has expired!',
      // });
      window.alert(
        'The Google Authenticator code is incorrect or has expired!',
      );
    }
  }

  componentDidUpdate = () => {
    // if (!isEmpty(this.props.errors) && !this.state.formError) {
    //   let formError = this.errorMap[this.props.errors.type];
    //   this.setState({formError});
    // }
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
    // alert('call');
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
    // this.props.clearErrors();
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
    // this.props.clearErrors();
    this.setState({
      password_confirmation,
      confirmNewPasswordError,
      formError: '',
    });
  };

  tokenallowSubmission = () => {
    const {token_2faError, isDirty} = this.state;
    return !token_2faError && isDirty;
  };

  twofaclick = (e) => {
    e.preventDefault();
    const {token_2fa, enabled_2fa} = this.state;
    if (this.tokenallowSubmission()) {
      this.props.setTwoFAKey(token_2fa, enabled_2fa);
      e.target.reset();
      // this.setState({
      //   googletwofakey: '',
      // });
    } else {
      let token_2faError = '';
      if (!token_2fa) {
        token_2faError = 'Please enter two factor code!';
      }
      this.setState({
        token_2fa,
        token_2faError,
        formError: '',
        isDirty: true,
      });
    }
  };

  twofatorcode = (e) => {
    e.preventDefault();
    let token_2fa = e.target.value;
    let token_2faError = '';
    if (!token_2fa) {
      token_2faError = 'Please enter two factor code!';
    } else if (token_2fa.length < 6) {
      token_2faError = 'The length of the two factor code should be 6';
    }
    this.props.clearErrors();
    this.setState({token_2faError, token_2fa, formError: '', isDirty: true});
  };

  twofaForm = (e) => {
    e.preventDefault();
    this.setState({token_2fForm: true});
  };

  render() {
    const Profile = this.props.heading;
    const {googletwofakey} = this.state;
    console.log(googletwofakey);
    const link = `otpauth://totp/Bitfex(${this.props.profile.profile.full_name})?secret=${googletwofakey}`;
    // console.log(this.props.apisecretkeys.twofastatus);
    // console.log(this.props.apisecretkeys.twofakey);
    console.log(this.props.errors);
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
                    <div className="auth_text nopadd">
                      {/* <img src="images/cromeimg.png" className="crome_image" /> */}
                      <img src={cromeimg} className="crome_image" />
                      <h3>Google Auth (2FA)</h3>
                    </div>
                  </div>
                  <div className="col-md-4 enable_button">
                    <button onClick={this.twofaForm}>
                      {this.props.apisecretkeys.twofakey ? `Enalbe` : `Disable`}
                    </button>
                  </div>
                  {/* {this.state.errmsg && (
                    <div className="securityauth-error">
                      <p>{this.state.errmsg}</p>
                    </div>
                  )} */}
                  {this.state.successmsg && (
                    <div className="securitymsg-success">
                      <p>{this.state.successmsg}</p>
                    </div>
                  )}
                  <form
                    style={{
                      display: this.state.token_2fForm ? 'block' : 'none',
                    }}
                    onSubmit={this.twofaclick}
                  >
                    {this.props.apisecretkeys.twofakey ? (
                      <div>
                        <div className="security_from">
                          <label>Select</label>
                          <div className="inputWithIcon">
                            <input
                              type="text"
                              className="google_authinput"
                              defaultValue={googletwofakey}
                            />
                            {/* <i className="fa fa-lock" /> */}
                          </div>
                        </div>
                        <p className="scan_text">
                          Scan this with the Google Authenticator
                        </p>
                        <div>
                          <QRCode size={200} value={link} />
                        </div>
                      </div>
                    ) : null}
                    <div className="security_from">
                      <label>Two-factor code</label>
                      <div className="inputWithIcon">
                        <input
                          type="password"
                          placeholder=""
                          onInput={this.twofatorcode}
                        />
                        {/* <i class="fa fa-codiepie" /> */}
                        <span className="error-msg">
                          {this.state.token_2faError}
                        </span>
                        <img src={inputimg} className="input_img" />
                      </div>
                    </div>
                    <div className="enable_button">
                      <button>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Security.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setTwoFAKey: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  apisecretkeys: state.apisecretkeys,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  changePassword,
  setTwoFAKey,
})(Security);
