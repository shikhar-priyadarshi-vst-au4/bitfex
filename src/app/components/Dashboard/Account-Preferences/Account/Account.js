import React, {Component} from 'react';

class Account extends Component {
  render() {
    const Profile = this.props.name;
    return (
      <>
        <div className="containment">
          <div className="balances">
            <h3>My Profile</h3>
            <hr />
            <div className="centered">
              <div className="balances-form">
                <div className="a5-form-field">
                  <label>Email</label>
                  <input
                    value="anil.kumar@stigasoft.com"
                    readOnly
                    type="text"
                  />
                </div>
                <div className="a5-form-field">
                  <label>Name</label>
                  <input value="Anil" readOnly type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="balances pt-5">
            {/* <!-- <h3>Activity Log</h3> --> */}
            <div className="table-container contained activity-log">
              <div className="table-header">
                <h3>Login History</h3>
                {/* <!-- <div className="table-header-rt">
          <span className="table-rt-icon search">Search</span>
          <span className="table-rt-icon print">Print</span>
        </div> --> */}
              </div>
              <div className="a5-table d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Ip Address</th>
                      <th>Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                    <tr>
                      <td>2020-05-13 14:40:28</td>
                      <td>182.69.169.193</td>
                      <td>Chrome 81.0.4044.138, Windows</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Account;
