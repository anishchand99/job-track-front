import React, { Component } from 'react';
import './settings.css';
const initialState = {
  name: '',
  password: '',
  new_password: '',
};
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.nameRef = React.createRef();
    this.currentRef = React.createRef();
    this.newRef = React.createRef();
    this.confirmationMessage = React.createRef();
  }

  onNameChange = (event) => {
    this.nameRef.current.placeholder = '';
    this.setState({ name: event.target.value });
  };
  onCurrentChange = (event) => {
    this.currentRef.current.placeholder = '';
    this.setState({ password: event.target.value });
  };
  onNewChange = (event) => {
    this.newRef.current.placeholder = '';
    this.setState({ new_password: event.target.value });
  };

  onChangeCredentials = () => {
    if (this.state.name === '') {
      this.nameRef.current.value = '';
      this.nameRef.current.placeholder = 'Name cannot be empty';
      return;
    }
    if (this.state.password === '' || this.state.password.length < 7) {
      this.currentRef.current.value = '';
      this.currentRef.current.placeholder =
        'Password must be at least 7 characters';
      return;
    }
    if (this.state.new_password === '' || this.state.new_password.length < 7) {
      this.newRef.current.value = '';
      this.newRef.current.placeholder =
        'Password must be at least 7 characters';
      return;
    }
    fetch('https://evening-taiga-71052.herokuapp.com/updateCredentials', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.user.id,
        name: this.state.name,
        password: this.state.password,
        new_password: this.state.new_password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user[0].id) {
          this.props.onUserName(user[0]);
        }
      });
  };
  render() {
    return (
      <div className='settings'>
        <div className='help'>
          This page is used to change your credentials if you want. Please enter
          your username (new or old), your current password and your new
          password. Enter your same username or password if you do not want to
          change them both. Enter your current password to pass validation and
          commit changes.
        </div>
        <div className='inputForm'>
          <div className='username line'>
            <div>Enter New Username</div>
            <input
              type='text'
              placeholder='New Username'
              onChange={this.onNameChange}
              ref={this.nameRef}
            />
          </div>
          <div className='password line'>
            <div> Enter Current Password</div>
            <input
              type='password'
              placeholder='Current Password'
              onChange={this.onCurrentChange}
              ref={this.currentRef}
            />
          </div>
          <div className='password line'>
            <div>Enter New Password</div>
            <input
              type='password'
              placeholder='New Password'
              onChange={this.onNewChange}
              ref={this.newRef}
            />
          </div>
          <button className='change' onClick={this.onChangeCredentials}>
            Change
          </button>
        </div>
        <div className='response hide' ref={this.confirmationMessage}>
          Change Successful
        </div>
      </div>
    );
  }
}

export default Settings;
