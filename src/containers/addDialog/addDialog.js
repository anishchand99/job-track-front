import React, { Component } from 'react';
import './addDialog.css';
const initialState = {
  // the text value entered on the input field as the name of the job search list
  ListName: '',
  userId: -1,
};
class addDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.inputRef = React.createRef();
  }
  async componentDidMount() {
    //React way of doing  => add onclick to plus icon instead of dom query
    await this.props.getData;
    this.setState({ userId: this.props.user.id });
  }
  onTextChange = (event) => {
    this.setState({ ListName: event.target.value });
  };
  async componentDidUpdate() {
    await this.props.getData;
    if (this.state.userId !== this.props.user.id) {
      this.setState({ userId: this.props.user.id });
    }
  }

  addItem = () => {
    const { addList } = this.props;
    //send the created list to the server side
    fetch('https://evening-taiga-71052.herokuapp.com/addList', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listName: this.state.ListName,
        id: this.state.userId, //id of the user corresponding to the email
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    addList(this.state.ListName);
    this.inputRef.current.value = '';
  };

  render() {
    return (
      <div className='dialog'>
        <div className='text'>Name of the List:</div>
        <input
          className='name'
          type='text'
          onChange={this.onTextChange}
          ref={this.inputRef}
        />
        <button className='add' onClick={this.addItem}>
          add
        </button>
      </div>
    );
  }
}
export default addDialog;
