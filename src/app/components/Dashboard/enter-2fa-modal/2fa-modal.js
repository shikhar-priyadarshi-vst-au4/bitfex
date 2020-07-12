import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setMFAAuthentication} from '../../../redux/actions/authActions';

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
    this.props.hideMFAModal();
  };

  render() {
    return (
      <>
        <div onClick={() => this.props.hideMFAModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            <div className="box-modal-header">
              <h3>Enter 2FA code</h3>
            </div>
            <div className="box-modal-body">
              <div className="transfer-form">
                <div className="transfer-form-field">
                  <input
                    placeholder={'Enter 2FA'}
                    style={{width: '100%'}}
                    type="text"
                    onInput={this.handleCode}
                  />
                </div>
                <div className="transfer-center-button">
                  <button
                    onClick={this.handleSubmit}
                    className="form-btn-yellow send-button-modal"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
