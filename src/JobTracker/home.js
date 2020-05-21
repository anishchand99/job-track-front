import React, { Component } from 'react';
import './home.css';
import Sidebar from '../containers/sidebar/sidebar';
import MainDisplay from '../containers/main-display/main-display';
import Profile from '../containers/profile/profile';
import Settings from '../containers/settings/settings';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: '',
      listToDisplay: '',
      recordsFromServer: {},
      dumUser: {},
    };
    this.desiredList = '';
  }
  onTabSelect = (tab) => {
    this.setState({ tabSelected: tab }, () => {});
  };
  onListSelect = (name) => {
    this.setState({ listToDisplay: name }, () => {
      this.desiredList = name;
    });
  };
  onUserName = (user) => {
    this.setState({ dumUser: user });
  };

  render() {
    const { recordsFromServer, listToDisplay } = this.state;
    const { user } = this.props;
    return (
      <div className='home'>
        <div className='sideBar'>
          <Sidebar
            user={user}
            dumUser={this.state.dumUser}
            onListSelect={this.onListSelect}
            onTabSelect={this.onTabSelect}
          ></Sidebar>
        </div>
        <div className='application'>
          {this.state.tabSelected === 'settings' ? (
            <Settings user={user} onUserName={this.onUserName} />
          ) : this.state.tabSelected === 'profile' ? (
            <Profile user={user} />
          ) : (
            <MainDisplay
              user={user}
              recordsFromServer={recordsFromServer}
              listToDisplay={listToDisplay}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
