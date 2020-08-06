import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import isEmpty from '../../validation/is-empty';
import { clearErrors } from './EmailVerification.action';
import { confirmUserCode, sendEMail } from './EmailVerification.api';
import './EmailVerifiction.css';

class EmailVerifiction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail:
        this.props.auth.registerInfo.email || this.props.auth.logInInfo.email,
      code: '',
      senEmail: this.props.auth.sendEmail.email || '',
      codeError: '',
      successmsg: '',
      seconds: 60,
    };
  }

  componentDidMount = () => {
    if (this.state.seconds > 0) {
      setTimeout(() =>
        this.setState({ seconds: (this.state.seconds - 1, 1000) }),
      );
    } else {
      this.setState({ seconds: '' });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps.auth);
    if (!isEmpty(nextProps.auth.registerInfo)) {
      this.setState({ userEmail: nextProps.auth.registerInfo.email });
    }
    if (!isEmpty(nextProps.auth.logInInfo)) {
      this.setState({ userEmail: nextProps.auth.logInInfo.email });
    }
    if (nextProps.auth.isAuthenticated) {
      // eslint-disable-next-line no-unused-expressions
      // window.location.href = '/trade';
      this.props.history.push('/dashboard/account');
    }

    if (
      !isEmpty(nextProps.errors) &&
      nextProps.errors.type === 'already_confirmed'
    ) {
      this.setState({ codeError: 'User Already Confirmed!' });
    }
    if (
      !isEmpty(nextProps.errors) &&
      nextProps.errors.type === 'token_mismatch'
    ) {
      this.setState({ codeError: 'Please Enter Correct Verification Code !' });
    }
    if (!isEmpty(nextProps.auth.sendEmail.email)) {
      this.setState({ senEmail: nextProps.auth.sendEmail.email });
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (newState.codeError) {
      setTimeout(() => {
        this.setState({ codeError: '' });
      }, 4000);
    }
    if (newState.successmsg) {
      setTimeout(() => {
        this.setState({ successmsg: '' });
      }, 4000);
    }
  };

  handleCode = (e) => {
    let val = e.target.value;
    this.setState({ code: val });
  };

  handleSubmit = (e) => {
    const { userEmail, code } = this.state;
    this.props.confirmUserCode(userEmail, code);
  };

  handleEmail = (e) => {
    e.preventDefault();
    this.props.sendEmail(this.state.userEmail, this.props.resendCategory);
    if (this.state.sendEmail != '') {
      this.setState({ successmsg: 'Email Verification code sent successfully' });
      this.props.clearErrors();
    }
  };

  render() {
    const styles = {
      modelheader: {
        marginLeft: '140px',
        fontSize: '18px',
        color: '#0278e1',
      },
      cnfrmbtn: {
        height: '36px',
        marginRight: '104px',
        width: '48%',
        borderRadius: '2px',
        backgroundColor: '#f18d05',
        border: 'none',
        color: 'white',
        fontSize: '18px',
      },
      apikeyInput: {
        height: '30px',
        width: '100%',
        borderRadius: '4px',
        fontSize: '14px',
      },
    };
    // console.log(this.state.code);
    console.log(this.props);
    console.log(this.state.senEmail);

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={styles.modelheader}
          >
            {this.state.codeError
              ? this.state.codeError
              : this.state.successmsg
                ? this.state.successmsg
                : 'Security verifiction'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" style={{ padding: '8px', marginBottom: '5px' }}>
            <div className="col-md-12">
              <p>
                To active your account, please complete the following
                verifiction
              </p>
            </div>
          </div>
          <div className="row" style={{ padding: '8px', marginBottom: '5px' }}>
            <div className="col-md-12">
              <span style={{ fontSize: '14px' }}>E-mail verifiction code</span>
              <input
                type="text"
                style={styles.apikeyInput}
                onInput={this.handleCode}
              // placeholder={'Enter Email Verfiction code'}
              />
              <span style={{ fontWeight: '100', fontSize: '14px' }}>
                Enter the 6 digit code received by{' '}
                <b style={{ fontWeight: '500' }}>{this.state.userEmail}</b>
              </span>
            </div>
          </div>
          <div className="row" style={{ padding: '8px', marginBottom: '5px' }}>
            <div className="col-md-12">
              <button
                style={{
                  fontSize: '14px',
                  color: 'rgb(2, 120, 225)',
                  border: 'none',
                  background: 'none',
                }}
                onClick={this.handleEmail}
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

// EmailVerifiction.propTypes = {
//   hideMFAModal: PropTypes.func.isRequired,
//   validateFor: PropTypes.string.isRequired,
// };

EmailVerifiction.propTypes = {
  confirmUserCode: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  confirmUserCode,
  sendEMail,
  clearErrors,
})(withRouter(EmailVerifiction));
