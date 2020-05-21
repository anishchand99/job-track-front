import React, { Component } from 'react';
import './JobTracker.css';
import Home from './home';
import Navbar from '../containers/navbar/navbar';
import Signin from '../containers/signin/signin';
import IntroText from '../containers/intro-text/IntroText';
import Register from '../containers/register/register';

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
  },
};
class JobTracker extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  };
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn } = this.state;
    return (
      <div className='job-tracker'>
        <Navbar
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        ></Navbar>
        {this.state.route === 'home' ? (
          <div>
            <Home user={this.state.user}></Home>
          </div>
        ) : this.state.route === 'register' ? (
          <div className='indexScreen'>
            <IntroText></IntroText>
            <Register
              className='register'
              isSignedIn={isSignedIn}
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        ) : (
          <div className='indexScreen'>
            <IntroText></IntroText>
            <Signin
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        )}
      </div>
    );
  }
}
export default JobTracker;
