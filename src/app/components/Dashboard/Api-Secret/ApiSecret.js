import React, {Component} from 'react';

export class ApiSecret extends Component {
  render() {
    const Profile = this.props.heading;
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
      </div>
    );
  }
}

export default ApiSecret;
