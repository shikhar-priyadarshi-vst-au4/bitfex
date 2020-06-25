import React, {Component} from 'react';

export class ApiSecret extends Component {
  render() {
    return (
      <>
        <div className="containment">
          <div className="balances pb-5">
            <h3>API Credentials</h3>
            <div className="balance-notice">
              <h3>Activate 2FA</h3>
              <p>
                Please make sure that you have activated 2FA before proceeding.
              </p>
              <button className="form-btn-yellow">Proceed</button>
            </div>
          </div>
          <div className="balances mt-5 pt-2 pb-5">
            <h3>Enter Two-Factor-Code</h3>
            <div className="centered">
              <div className="balances-form">
                <div className="a5-form-field">
                  <label>Two-Factor-Code</label>
                  <input type="text" />
                </div>
                <div className="a5-form-field">
                  <div className="d-flex w-100 justify-content-center">
                    <button className="form-btn-yellow">Submit</button>
                    <button className="form-btn-gray ml-3 pl-3 pr-3">
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="balances mt-5 pt-2 pb-5">
            <h3>Copy Keys</h3>
            <div className="centered">
              <div className="copy-referral">
                <label>API Key</label>
                <input value="sjdbhhcsdvahvdhfsjjvfjvv" type="text" readOnly />
              </div>
              <div className="copy-referral">
                <label>API Secret</label>
                <input value="sjdbhhcsdvahvdhfsjjvfjvv" type="text" readOnly />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ApiSecret;
