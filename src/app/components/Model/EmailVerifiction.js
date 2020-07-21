import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import isEmpty from '../../validation/is-empty';
import {confirmUserCode} from '../../redux/actions/authActions';

class EmailVerifiction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.auth.registerInfo.email || '',
      code: '',
      codeError: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.auth);
    if (!isEmpty(nextProps.auth.registerInfo)) {
      this.setState({userEmail: nextProps.auth.registerInfo.email});
    }
    if (nextProps.auth.isAuthenticated) {
      console.log('in');
      // eslint-disable-next-line no-unused-expressions
      // window.location.href = '/trade';
      this.props.history.push('/dashboard/account');
    }

    if (
      !isEmpty(nextProps.errors) &&
      nextProps.errors.type === 'already_confirmed'
    ) {
      this.setState({codeError: 'User Already Confirmed!'});
    }
    if (
      !isEmpty(nextProps.errors) &&
      nextProps.errors.type === 'token_mismatch'
    ) {
      this.setState({codeError: 'Please Enter Correct Verification Code !'});
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (newState.codeError) {
      setTimeout(() => {
        this.setState({codeError: ''});
      }, 2000);
    }
  };

  handleCode = (e) => {
    let val = e.target.value;
    this.setState({code: val});
  };

  handleSubmit = (e) => {
    const {userEmail, code} = this.state;
    // let action = this.props.validateFor;
    this.props.confirmUserCode(userEmail, code);
  };

  render() {
    const styles = {
      modelheader: {
        marginLeft: '265px',
        fontSize: '18px',
        color: '#0278e1',
      },
      cnfrmbtn: {
        height: '43px',
        marginRight: '201px',
        width: '48%',
        borderRadius: '2px',
        backgroundColor: '#f18d05',
        border: 'none',
        color: 'white',
        fontSize: '18px',
      },
      apikeyInput: {
        height: '43px',
        width: '100%',
        borderRadius: '4px',
        fontSize: '14px',
      },
    };
    // console.log(this.state.code);
    console.log(this.props);
    console.log(this.state.codeError);
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
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
              : 'Enter Email Verfivation code'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <input
                type="text"
                style={styles.apikeyInput}
                onInput={this.handleCode}
                placeholder={'Enter Email Verfiction code'}
              />
              {this.state.nameError && (
                <div className="api-key-error">
                  <p>{this.state.nameError}</p>
                </div>
              )}
            </div>
            <div className="col-md-3" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button style={styles.cnfrmbtn} onClick={this.handleSubmit}>
            SEND
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {confirmUserCode})(
  withRouter(EmailVerifiction),
);
