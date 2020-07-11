import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInr, faHistory} from '@fortawesome/free-solid-svg-icons';
import Bitcoin from '../../../../../assets/img/bitcoin.png';
import Tether from '../../../../../assets/img/tetherUs.png';

export class ApiSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiSecretkey: this.props.apisecretkeys.apisecretkeys,
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

  render() {
    const Profile = this.props.heading;
    const {apiSecretkey} = this.state;
    console.log(apiSecretkey);

    const styles = {
      newelementrow: {
        marginTop: '15px',
      },
      select: {
        marginTop: '20px',
      },
      linkbtn: {
        fontSize: '14px',
        border: '1px solid black',
      },
      img: {
        height: '35px',
        marginLeft: '-70px',
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
            <div className="credentials">
              <p>
                Please enable google two factor authentication to get api
                secret!
              </p>
            </div>
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
                    <th>Secret key</th>
                  </tr>
                  {Array.from(apiSecretkey).map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.id}</td>
                      <td>{item.key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApiSecret.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  apisecretkeys: state.apisecretkeys,
});

export default connect(mapStateToProps)(ApiSecret);
