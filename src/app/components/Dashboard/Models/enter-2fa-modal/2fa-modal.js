import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {addapisecretkey} from '../../../../redux/actions/apiSecretand2faAction';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {setMFAAuthentication} from '../../../../redux/actions/authActions';

class MFAModal extends Component {
  constructor(props) {
    super(props);
    this.state = {code: ''};
  }

  handleCode = (e) => {
    let val = e.target.value;
    this.setState({code: val});
  };

  handleSubmit = (e) => {
    let action = this.props.validateFor;
    this.props.setMFAAuthentication(action);
    this.props.onHide();
  };

  render() {
    const styles = {
      modelheader: {
        marginLeft: '300px',
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
            Enter 2FA code
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
                placeholder={'Enter 2FA'}
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

MFAModal.propTypes = {
  hideMFAModal: PropTypes.func.isRequired,
  validateFor: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {setMFAAuthentication})(MFAModal);
