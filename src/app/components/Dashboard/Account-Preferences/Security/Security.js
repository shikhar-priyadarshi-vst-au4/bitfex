import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cromeimg from '../../../../../assets/img/cromeimg.png';
import GoogleAuthSVG from '../../../../../assets/img/._google-authenticator.svg';
import scanimg from '../../../../../assets/img/scanimg.png';
import inputimg from '../../../../../assets/img/inputimg.png';

export class Security extends Component {
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
  }

  render() {
    const Profile = this.props.heading;
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
                  <div className="security_from">
                    <label>Current Password</label>
                    <div className="inputWithIcon">
                      <input type="text" placeholder="true" />
                      <i className="fa fa-lock" />
                    </div>
                  </div>
                  <div className="security_from">
                    <label>Password</label>
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        placeholder="8-20 alpha numeric characters"
                      />
                      <i className="fa fa-lock" />
                    </div>
                  </div>
                  <div className="security_from">
                    <label>Confirm Password</label>
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        placeholder="8-20 alpha numeric characters"
                      />
                      <i className="fa fa-lock" />
                    </div>
                  </div>
                  <button className="update_button">Update Password</button>
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
                    <button>Enalbe</button>
                  </div>
                    <div className="security_from">
                      <label>Select</label>
                      <div className="inputWithIcon">
                        <input type="text" placeholder="JDHFJSDHGKHVJKVHKD" className="google_authinput"/>
                        {/* <i className="fa fa-lock" /> */}
                      </div>
                    </div>
                    <p className="scan_text">Scan this with the Google Authenticator</p>
                    <div><img src={scanimg} /></div>
                    <div className="security_from">
                      <label>Two-factor code</label>
                      <div className="inputWithIcon">
                        <input type="text" placeholder=""/>
                        {/* <i class="fa fa-codiepie" /> */}
                        <img src={inputimg} className="input_img"/>
                      </div>
                    </div>
                    <div className="enable_button">
                    <button>Submit</button>
                  </div>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Security);
