import React, { Component } from 'react';
import './signin.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch('https://evening-taiga-71052.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className='signin'>
        <h2>Signin</h2>
        <div className='center'> Email </div>
        <input
          className='blank'
          type='text'
          onChange={this.onEmailChange}
          placholder=''
          ref={this.emailRef}
          required
        />
        <div className='center'>Password</div>
        <input
          className='blank'
          type='password'
          onChange={this.onPasswordChange}
          placholder=''
          ref={this.passRef}
          required
        />
        <div className='submit' onClick={this.onSubmitSignIn}>
          {' '}
          Sign In{' '}
        </div>
        <div className='submit' onClick={() => onRouteChange('register')}>
          {' '}
          Register{' '}
        </div>
      </div>
    );
  }
}
export default Signin;
