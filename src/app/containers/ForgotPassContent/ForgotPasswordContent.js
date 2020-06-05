import React, {Component} from 'react';
import ForgotHeader from '../../components/ForgotPassword/ForgotHeader';
import Footer from '../../components/Footer';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
export class ForgotPasswordContent extends Component {
  render() {
    return (
      <div>
        <ForgotHeader />
        <ForgotPassword />
        <Footer />
      </div>
    );
  }
}

export default ForgotPasswordContent;
