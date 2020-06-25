import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class ApiSecret extends Component {
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

ApiSecret.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ApiSecret);
