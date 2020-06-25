import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
// import Header from '../Header/index';
import Header from './Header/index';
import routes from './routes';

const userInfo = {};

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                {...prop}
                routes={routes}
                {...userInfo}
              />
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
      sidebarToggle: false,
    };
  }

  componentDidMount = () => {
    let sidebar = document.getElementById('main-sidebar');
    sidebar.style.top = 85;
    document.onscroll = () => {
      sidebar.style.height = document.body.scrollHeight + 'px';
    };
    document.body.addEventListener('click', this.bodyClickListener);
  };

  bodyClickListener = (e) => {
    this.setState({sidebarToggle: false});
    if (e.target.matches('.has-arrow')) {
      setTimeout(() => {
        this.setState({
          sidebarToggle: true,
        });
      });
    }
  };

  toggleSidebar = () => {
    let bool = !this.state.sidebarToggle;
    this.setState({sidebarToggle: bool});
  };

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          type="text/css"
          href="dashboard.scoped.css"
        ></link>
        <Header toggleSidebar={this.toggleSidebar} />
        <div className="d-flex w-100 dashboard-container">
          <Sidebar routes={routes} sidebarToggle={this.state.sidebarToggle} />
          {switchRoutes}
        </div>
      </>
    );
  }
}

export default Dashboard;
