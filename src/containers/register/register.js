import React, { Component } from 'react';
import './register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    };
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
    this.confirmRef = React.createRef();
  }

  onNameChange = (event) => {
    this.nameRef.current.placeholder = '';
    this.setState({ name: event.target.value });
  };
  onEmailChange = (event) => {
    this.emailRef.current.placeholder = '';
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.passRef.current.placeholder = '';
    this.setState({ password: event.target.value });
  };
  onConfirmChange = (event) => {
    this.confirmRef.current.placeholder = '';
    this.setState({ confirm_password: event.target.value });
  };
  onRegisterClick = () => {
    if (this.state.name === '' || this.state.name === null) {
      this.nameRef.current.placeholder = 'Proper Name is Required';
      return;
    }
    if (this.state.password === '' || this.state.password.length < 7) {
      this.passRef.current.value = '';
      this.passRef.current.placeholder =
        'Password must be at least 7 characters';
      return;
    }
    if (this.state.password !== this.state.confirm_password) {
      this.confirmRef.current.value = '';
      this.confirmRef.current.placeholder = 'Password must be a match';
      return;
    }
    fetch('http://localhost:3005/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user[0].id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <div className='signin'>
        <h2>Register</h2>
        <div className='center'> Name </div>
        <input
          className='blank'
          type='text'
          onChange={this.onNameChange}
          placholder=''
          ref={this.nameRef}
          required
        />
        <div className='center'> Email </div>
        <input
          className='blank'
          type='text'
          onChange={this.onEmailChange}
          placholder=''
          ref={this.emailRef}
          required
        />
        <div className='center'> Password</div>
        <input
          className='blank'
          type='password'
          onChange={this.onPasswordChange}
          placholder=''
          ref={this.passRef}
          required
        />
        <div className='center'>Confirm Password</div>
        <input
          className='blank'
          type='password'
          onChange={this.onConfirmChange}
          placholder=''
          ref={this.confirmRef}
          required
        />
        <div className='submit' onClick={this.onRegisterClick}>
          {' '}
          Register{' '}
        </div>
        <div className='submit' onClick={() => onRouteChange('signin')}>
          {' '}
          Signin{' '}
        </div>
      </div>
    );
  }
}
export default Register;
