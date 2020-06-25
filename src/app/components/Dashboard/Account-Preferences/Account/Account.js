import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {getCurrentProfile} from '../../../../redux/actions/profileActions';

class Account extends Component {
  componentDidMount() {
    // this.props.getCurrentProfile();

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
    const Profile = this.props.name;
    // console.log(this.props.profile.profile);
    console.log(this.props);
    return (
      <div className="row dashboard_container">
        <div className="col-md-12 contentcontainer">
          <div className="wallet_container">
            <h4 className="content_heading">{this.props.heading}</h4>
            <p className="preferences_account">
              Account &amp; Preferences / <span>{Profile.toUpperCase()}</span>
            </p>
            <div className="row account_detail">
              <div className="col-md-6 my_profilediv">
                <div className="user_accountdetail">
                  <h4 className="account_tableheading">My Profile</h4>
                  <p>
                    <strong>Email:</strong>
                    {this.props.auth.user.email}
                  </p>
                  <p>
                    <strong>Name:</strong>
                    {this.props.auth.user.first_name}{' '}
                    {this.props.auth.user.last_name}
                  </p>
                  <p>
                    <strong>Desktop User ID:</strong>ANIL_KUMAR_STIGASOFT_COM
                  </p>
                  <p>
                    <strong>Exchange Account ID:</strong>
                    1576480904_ANIL_KUMAR_STIGASOFT_COM
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="accountdetail_table">
                  <h4 className="account_tableheading">Activity Log</h4>
                  <table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>Date and Time</th>
                        <th>IP Address</th>
                        <th>Browser</th>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                      <tr>
                        <td>2020-05-08 14:53:21</td>
                        <td>27.56.231.100</td>
                        <td>Chrome 80.0.3987.100, Linux</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {})(Account);
