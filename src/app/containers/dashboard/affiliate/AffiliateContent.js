import React, {Component} from 'react';
import Sidebar from '../../../components/Dashboard/Sidebar/Sidebar';
import Affiliate from '../../../components/Dashboard/Affiliate/Affiliate';
import Header from '../../../components/Header/index';
import Footer from '../../../components/Footer/index';
class AffiliateContent extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Affiliate />
        <Footer />
      </div>
    );
  }
}

export default AffiliateContent;
