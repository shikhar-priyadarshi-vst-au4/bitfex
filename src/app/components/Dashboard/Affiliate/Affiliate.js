import React, {Component} from 'react';

export class Affiliate extends Component {
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
                  <h4 className="account_tableheading">Share Referral Link</h4>
                  <div className="security_from">
                    <label>
                      Copy your personal referral link and share it with your
                      friends
                    </label>
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        placeholder="http://bitfex.demolinks.xyz/#/register?ref=91355e"
                      />
                      <i className="fa fa-lock" />
                    </div>
                  </div>
                  <button className="update_button">Copy Referral Link</button>
                  <p>Total Referrals: 4</p>
                </div>
              </div>
              {/* <div className="col-md-6 google_container"></div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Affiliate;
