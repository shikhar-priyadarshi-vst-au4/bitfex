import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {addapisecretkey} from '../../../../redux/actions/apiSecretand2faAction';
import {clearErrors} from '../../../../redux/actions/errorActions';

class ApiScretekeyModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      formError: '',
      isDirty: false,
    };
  }

  allowSubmission = () => {
    const {nameError, isDirty} = this.state;
    return !nameError && isDirty;
  };

  addapikey = (e) => {
    e.preventDefault();
    const {name} = this.state;
    if (this.allowSubmission()) {
      this.props.addapisecretkey(name);
      this.props.onHide();
      // this.props.hideKeyPairModal();
    } else {
      let nameError = '';
      if (!name) {
        nameError = 'Please enter your Api key!';
      }
      this.setState({
        nameError,
        formError: '',
        isDirty: true,
      });
    }
  };

  apikeyname = (e) => {
    e.preventDefault();
    // alert('call');
    let name = e.target.value;
    let nameError = '';
    if (!name) {
      nameError = 'Please enter your Api key!';
    }
    this.props.clearErrors();
    this.setState({name, nameError, formError: '', isDirty: true});
  };

  render() {
    const styles = {
      modelheader: {
        marginLeft: '300px',
        fontSize: '19px',
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
        onClick={(e) => e.stopPropagation()}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={styles.modelheader}
          >
            CREATE AN API KEY
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter a name for your Api Key"
                style={styles.apikeyInput}
                onInput={this.apikeyname}
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
          <button style={styles.cnfrmbtn} onClick={this.addapikey}>
            Create Api Key
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ApiScretekeyModel.propTypes = {
  addapisecretkey: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {clearErrors, addapisecretkey})(
  ApiScretekeyModel,
);
