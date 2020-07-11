import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteapikey} from '../../../../redux/actions/apiSecretand2faAction';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInr, faHistory, faCopy} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-bootstrap';
// import {useAlert} from 'react-alert';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ApiScretekeyModel from '../../Models/ApiScretekeyModel/ApiScretekeyModel';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

export class ApiSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiSecretkey: this.props.apisecretkeys.apisecretkeys,
      copied: false,
      apiKeyModal: false,
    };
  }

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
    this.setState({apiSecretkey: nextProps.apisecretkeys.apisecretkeys});
  }

  showTransferBalanceModal = (e) => {
    this.setState({openTransferBalModal: true});
    this.setState({id: e.target.id});
  };

  hideTransferBalanceModal = () => {
    this.setState({openTransferBalModal: false});
  };

  copyToClipboard = () => {
    alert('Copied');
  };

  // hideCopyMessage() {
  //   this.timer = setTimeout(() => {
  //     this.defaultPosition();
  //   }, 2000);
  // }

  // defaultPosition() {
  //   clearTimeout(this.timer);
  //   this.setState({copied: false});
  // }

  secretCopyToClipboard = () => {
    alert('Copied');
  };

  deleteapikeys = (name) => {
    // console.log(key);
    confirmAlert({
      title: 'Are you sure?',
      message: `Do you confirm that you want to delete the API Key named ${name}?`,
      buttons: [
        {
          label: `DELETE ${name.toUpperCase()}`,
          onClick: () => {
            this.props.deleteapikey({name});
          },
        },
        {
          label: 'GO BACK',
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const Profile = this.props.heading;
    const {apiSecretkey} = this.state;
    console.log(this.props.location.pathname);
    const currentRout = this.props.location.pathname;

    const styles = {
      fontbutton: {
        border: 'none',
        backgroundColor: 'white',
      },
      fontclass: {
        fontSize: '18px',
        color: '#00afff',
      },
      apikeyaddbtn: {
        fontSize: '14px',
        border: '1px solid grey',
        marginLeft: '12px',
        height: '45px',
        width: '170px',
        boxShadow: '1 3px 7px -1px rgba(1,1,1,.4)',
      },
    };

    return (
      <div className="row dashboard_container">
        <div className="col-md-10 contentcontainer">
          <div className="wallet_container">
            <h4 className="content_heading">{Profile}</h4>
            <p className="preferences_account">
              ACCOUNT &amp; PREFERENCES / <span> {Profile.toUpperCase()}</span>
            </p>
            {/* <div className="credentials">
              <p>
                Please enable google two factor authentication to get api
                secret!
              </p>
            </div> */}
            <Button
              variant="primary"
              style={styles.apikeyaddbtn}
              id="1"
              onClick={this.showTransferBalanceModal}
            >
              Genrate Api Key
            </Button>
          </div>
        </div>
        <div className="row account_detail">
          <div className="col-md-12 balance_container">
            <div className="">
              <h4 className="account_tableheading">Your API keys</h4>
            </div>
            <div className="clear-fix" />
            <div className="table-responsive">
              <table className="table balances_table table-striped dashboard_table">
                <tbody>
                  <tr>
                    <th>Api Key Name</th>
                    <th>Api key</th>
                    <th>
                      Secret key (NOTE: The Secret key will be hidden forever.
                      if u change the page or you refresh the page. Kindly save
                      it securely.)
                    </th>
                    <th>Action</th>
                  </tr>
                  {Array.from(apiSecretkey).map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>
                        {item.id}
                        &nbsp;&nbsp;
                        <CopyToClipboard
                          onCopy={this.copyToClipboard}
                          text={item.id}
                        >
                          <button
                            className="fontbutton"
                            style={styles.fontbutton}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="fontclass"
                                icon={faCopy}
                                style={styles.fontclass}
                              />{' '}
                              Copy
                            </span>
                          </button>
                        </CopyToClipboard>
                      </td>
                      <td>
                        {item.key}
                        &nbsp;&nbsp;
                        <CopyToClipboard
                          onCopy={this.secretCopyToClipboard}
                          text={item.key}
                        >
                          <button
                            className="fontbutton"
                            style={styles.fontbutton}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="fontclass"
                                icon={faCopy}
                                style={styles.fontclass}
                              />{' '}
                              Copy
                            </span>
                          </button>
                        </CopyToClipboard>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.deleteapikeys(item.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ApiScretekeyModel
          show={this.state.openTransferBalModal}
          onHide={this.hideTransferBalanceModal}
        />
      </div>
    );
  }
}

ApiSecret.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteapikey: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  apisecretkeys: state.apisecretkeys,
});

export default connect(mapStateToProps, {deleteapikey})(ApiSecret);
