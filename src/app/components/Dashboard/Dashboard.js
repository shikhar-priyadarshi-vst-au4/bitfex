import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
// import Header from '../Header/index';
import Header from './Header/index';
import Footer from '../Footer/index';
import routes from './routes';
import './Dashboard.css';

const userInfo = {};

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component {...props} {...prop} {...userInfo} />
            )}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
    };
  }

  render() {
    // console.log(switchRoutes);
    return (
      <div className="dashboard_body">
        <Header />
        <div className="row dashboard_container">
          <div className="col-md-2 sidebar_container">
            <Sidebar routes={routes} color={this.state.color} />
          </div>
          <div className="col-md-10 contentcontainer">
            <div className="wallet_container">{switchRoutes}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
