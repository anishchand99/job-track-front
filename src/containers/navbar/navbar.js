import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
  render() {
    const { isSignedIn, onRouteChange } = this.props;
    if (isSignedIn) {
      return (
        <div className='navbar'>
          <div className='logo'>Job Track</div>
          <div className='link' onClick={() => onRouteChange('signout')}>
            {' '}
            Signout{' '}
          </div>
        </div>
      );
    } else {
      return (
        <div className='navbar'>
          <div className='logo'>Job Track</div>
          <div className='link' onClick={() => onRouteChange('signin')}>
            {' '}
            SignIn{' '}
          </div>
          <div className='link' onClick={() => onRouteChange('register')}>
            {' '}
            Register
          </div>
        </div>
      );
    }
  }
}
export default Navbar;
