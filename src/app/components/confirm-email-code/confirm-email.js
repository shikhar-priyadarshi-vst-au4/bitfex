import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import isEmpty from '../../validation/is-empty';
import {resendEmailAPI} from './confirm-mail-api';
import {withAlert} from 'react-alert';
import './confirm-mail.css';
import store from '../../Redux_Store/store';
class VerifyEmailCode extends Component {
  constructor(props) {
    super(props);
    this.state = {code: '', formError: '', disabled: '', seconds: 60};
  }

  componentDidMount = () => {
    if (this.state.seconds > 0) {
      this.timer = setInterval(() => {
        let seconds = this.state.seconds - 1;
        this.setState({seconds});
      }, 1000);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('nextprops', nextProps);
    if (nextProps.auth.emailVerification === false) {
      this.setState({formError: 'Please Enter valid code'});
    }
    if (!isEmpty(nextProps.errors)) {
      this.props.hideEmailModal();
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (this.state.seconds === 1) {
      clearInterval(this.timer, this.setState({disabled: 'show'}));
    }
    if (newState.seconds === 0) {
      this.setState({seconds: 60});
    }
  };

  handleCode = (e) => {
    this.setState({code: e.target.value, formError: ''});
  };

  handleSubmit = (e) => {
    const {code} = this.state;
    if (!code.length) this.setState({formError: "Field can't be empty!"});
    else if (code.length < 6)
      this.setState({formError: 'Code should be more than 6 digit!'});
    else if (code.length > 6)
      this.setState({formError: 'Code should  be of exact 6 digit!'});
    else this.props.onSubmit(this.state.code);
  };

  handleResendEmail = (e) => {
    e.preventDefault();
    resendEmailAPI.resendEmail(this.props.emailid, this.props.resendCategory);
    if (this.state.seconds > 0) {
      this.timer = setInterval(() => {
        let seconds = this.state.seconds - 1;
        this.setState({seconds, disabled: ''});
      }, 1000);
    }
  };
  render() {
    return (
      <>
        <div onClick={() => this.props.hideEmailModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal-email">
            <div className="securty-heading ">
              <h3>Security verification</h3>
            </div>
            <div className="box-modal-body-email">
              <div className="transfer-form">
                <div className="input-box-format">
                  <input
                    onInput={this.handleCode}
                    type="text"
                    placeholder={'Enter Email verification code'}
                  />
                  <span className="a5-login-error">
                    {' '}
                    {this.state.formError}
                  </span>
                </div>

                <div className="emailMsgclass">
                  {' '}
                  <span
                    style={{
                      fontWeight: '100',
                      fontSize: '14px',
                    }}
                  >
                    Enter the 6 digit code received by{' '}
                    <strong style={{fontWeight: '500', color: '#47a1fb'}}>
                      {this.props.emailid}
                    </strong>
                  </span>
                </div>
                <div
                  className="d-flex form-btn-holder-email "
                  style={{marginTop: '3rem'}}
                >
                  <a onClick={this.handleSubmit} className="btn-verify">
                    Verify
                  </a>
                  <div>
                    <button
                      className="resend-mail"
                      disabled={!this.state.disabled}
                      style={{
                        color: this.state.disabled ? '#47a1fb' : '#666666',
                        outline: 'none',
                      }}
                      onClick={this.handleResendEmail}
                    >
                      Resend{' '}
                      {this.state.disabled ? null : `${this.state.seconds}s`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

VerifyEmailCode.propTypes = {
  hideEmailModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    auth: state.auth,
  };
};

export default compose(
  withAlert(),
  connect(mapStateToProps, {}),
  withRouter,
)(VerifyEmailCode);
