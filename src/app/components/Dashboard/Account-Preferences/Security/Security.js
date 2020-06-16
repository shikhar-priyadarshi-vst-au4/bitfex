import React, {Component} from 'react';
import GoogleAuth from '../../../../../assets/img/cromeimg.png';
import GoogleAuthSVG from '../../../../../assets/img/._google-authenticator.svg';

export class Security extends Component {
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
                    <div className="auth_text">
                      <img src="images/cromeimg.png" className="crome_image" />
                      <h3>Google Auth (2FA)</h3>
                    </div>
                  </div>
                  <div className="col-md-4 enable_button">
                    <button>Enalbe</button>
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

export default Security;
