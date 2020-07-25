import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {CHANGE_PASSWORD} from '../../../../constant';
import isEmpty from '../../../../validation/is-empty';
import {addapisecretkey} from '../../../../redux/actions/apiSecretand2faAction';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {
  setMFAAuthentication,
  changePassword,
  sendEmail,
} from '../../../../redux/actions/authActions';
import './TwoWaySecurity.css';

class TwoWaySecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: this.props.passwordInfo.old_password || '',
      password: this.props.passwordInfo.password || '',
      password_confirmation:
        this.props.passwordInfo.password_confirmation || '',
      token_2fa: '',
      token: '',
      successmsg: '',
      sendemail: this.props.auth.sendEmail.email || '',
      formError: '',
      token_2faCodeError: '',
      tokenCodeError: '',
      errortype1: '',
    };
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if (!isEmpty(nextProps.passwordInfo)) {
      this.setState({
        old_password: nextProps.passwordInfo.old_password,
        password: nextProps.passwordInfo.password,
        password_confirmation: nextProps.passwordInfo.password_confirmation,
      });
    }
    if (!isEmpty(nextProps.errors) && nextProps.errors.type === 'wrong_token') {
      this.setState({formError: 'Please Enter Correct Verification Code!'});
    }
    // if (!isEmpty(nextProps.auth.userNewpassword)) {
    //   this.props.onHide();
    // }
    if (!isEmpty(nextProps.auth.sendEmail.email)) {
      // this.setState({successmsg: 'Email Verification code sent successfully'});
      this.setState({sendemail: nextProps.auth.sendEmail.email});
    }
    if (
      !isEmpty(nextProps.errors.type) &&
      nextProps.errors.type === 'password_or_email_invalid'
    ) {
      this.setState({formError: 'Current password does not match!'});
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    if (!isEmpty(nextProps.auth.userNewpassword)) {
      // this.hideTwowaySecurityModal();
      this.setState({
        successmsg: 'Your password was successfully updated!',
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      // this.setState({passwordchangeerror: ''});
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (newState.formError) {
      setTimeout(() => {
        this.setState({formError: ''});
      }, 4000);
    }
    if (newState.successmsg) {
      setTimeout(() => {
        this.setState({successmsg: ''});
      }, 4000);
    }
  };

  allowSubmission = () => {
    const {token_2faCodeError, tokenCodeError, isDirty} = this.state;
    return !(token_2faCodeError || tokenCodeError) && isDirty;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      old_password,
      password,
      password_confirmation,
      token_2fa,
      token,
    } = this.state;
    if (this.allowSubmission() && token_2fa != '' && token != '') {
      this.props.changePassword({
        old_password,
        password,
        password_confirmation,
        token_2fa,
        token,
      });
      // this.setState({formError: 'Please Enter Correct Verification Code!'});
      // this.props.onHide();
    } else {
      let token_2faCodeError = '';
      let tokenCodeError = '';
      if (!token_2fa) {
        token_2faCodeError = 'Enter verification code!';
      }
      if (!token) {
        tokenCodeError = 'Please get a verification code first!';
      }
      this.setState({
        token_2faCodeError,
        tokenCodeError,
        formError: '',
        isDirty: true,
      });
    }
  };

  handleEmailCode = (e) => {
    e.preventDefault();
    // alert('call');
    let token = e.target.value;
    let tokenCodeError = '';
    if (!token) {
      tokenCodeError = 'Please get a verification code first!';
    } else if (token.length < 6) {
      tokenCodeError = 'Please enter a 6-digit verification code!';
    }
    this.props.clearErrors();
    this.setState({
      token,
      tokenCodeError,
      formError: '',
      isDirty: true,
    });
  };

  handleGoogleCode = (e) => {
    e.preventDefault();
    let token_2fa = e.target.value;
    let token_2faCodeError = '';
    if (!token_2fa) {
      token_2faCodeError = 'Please enter your password!';
    } else if (token_2fa.length < 6) {
      token_2faCodeError = 'Please enter a 6-digit verification code!';
    }
    this.props.clearErrors();
    this.setState({
      token_2fa,
      token_2faCodeError,
      formError: '',
      isDirty: true,
    });
  };

  handleResendEmail = (e) => {
    e.preventDefault();

    this.props.sendEmail(this.props.profile.profile.email, CHANGE_PASSWORD);
    if (this.state.sendemail !== '') {
      this.setState({
        successmsg: 'Email Verification code sent successfully',
      });
      this.props.clearErrors();
      // this.setState({formError: ''});
    }
  };

  //   handleSubmit = (e) => {
  //     // let action = this.props.validateFor;
  //     // this.props.setMFAAuthentication();
  //     this.props.onHide();
  //   };

  render() {
    const styles = {
      modelheader: {
        marginLeft: '140px',
        fontSize: '18px',
        color: '#0278e1',
      },
      cnfrmbtn: {
        height: '43px',
        marginRight: '104px',
        width: '48%',
        borderRadius: '2px',
        backgroundColor: '#f18d05',
        border: 'none',
        color: 'white',
        fontSize: '18px',
      },
      apikeyInput: {
        height: '36px',
        width: '100%',
        borderRadius: '4px',
        fontSize: '14px',
      },
    };

    console.log(this.props);
    console.log('hhhhhhhhh', this.state.formError);
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        onClick={(e) => e.stopPropagation()}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={styles.modelheader}
          >
            {this.state.formError
              ? this.state.formError
              : this.state.successmsg
              ? this.state.successmsg
              : 'Security verifiction'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" style={{padding: '8px', marginBottom: '5px'}}>
            <div className="col-md-11">
              <p>
                To active your account, please complete the following
                verifiction
              </p>
            </div>
            <div className="col-md-1" />
          </div>
          <div className="row" style={{padding: '8px', marginBottom: '5px'}}>
            <div className="col-md-12">
              <span style={{fontWeight: '500'}}>E-mail verification code</span>
              <input
                type="text"
                style={styles.apikeyInput}
                onInput={this.handleEmailCode}
              />
              {this.state.tokenCodeError ? (
                <span className="error-msg">{this.state.tokenCodeError}</span>
              ) : (
                <span style={{fontWeight: '100', fontSize: '14px'}}>
                  Enter the 6 digit code received by{' '}
                  <b style={{fontWeight: '500'}}>
                    {this.props.profile.profile.email}
                  </b>
                </span>
              )}
            </div>
          </div>
          <div className="row" style={{padding: '8px', marginBottom: '5px'}}>
            <div className="col-md-12">
              <span style={{fontWeight: '500'}}>Google verifiction code</span>
              <input
                type="text"
                style={styles.apikeyInput}
                onInput={this.handleGoogleCode}
              />
              {this.state.token_2faCodeError ? (
                <span className="error-msg">
                  {this.state.token_2faCodeError}
                </span>
              ) : (
                <span style={{fontWeight: '100'}}>
                  Enter the 6 digit code from Google Authenticator
                </span>
              )}
            </div>
          </div>
          <div className="row" style={{padding: '8px', marginBottom: '5px'}}>
            <div className="col-md-12">
              <button
                style={{
                  fontSize: '14px',
                  color: 'rgb(2, 120, 225)',
                  border: 'none',
                  background: 'none',
                }}
                onClick={this.handleResendEmail}
              >
                Resend Email{' '}
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button style={styles.cnfrmbtn} onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TwoWaySecurity.propTypes = {
  changePassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  setMFAAuthentication,
  clearErrors,
  changePassword,
  sendEmail,
})(TwoWaySecurity);
