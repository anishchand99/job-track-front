import React, { Component } from 'react';
import './sidebar.css';
import plusIcon from '../../images/icons-plus.png';
import AddDialog from '../addDialog/addDialog';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListName: [],
      userId: -1,
    };
    this.addBoxRef = React.createRef();
    this.plusButtonRef = React.createRef();
    //change the color of the selected list to hightlight
    this.selectedListColor = [];
  }
  async componentDidMount() {
    //React way of doing  => add onclick to plus icon instead of dom query
    await this.props.getData;
    this.setState({ userId: this.props.user.id });
    this.plusButtonRef.current.addEventListener('click', () => {
      this.addBoxRef.current.classList.add('reveal');
    });
    //get the existing ListNames from the server
    fetch('https://hidden-tundra-18901.herokuapp.com/getList', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.userId, // id of the user corresponding to the email
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((listData) => {
        this.setState({ ListName: listData });
      })
      .catch((err) => console.log(err));
  }
  //add a new created list to the state
  addList = (title) => {
    let temp = this.state.ListName;
    temp.push(title);
    this.setState({ ListName: temp });
    this.hideAddBox();
  };
  //hide the dialog box for list creation option
  hideAddBox = () => {
    this.addBoxRef.current.classList.remove('reveal');
  };

  //select the list to display
  selectList = (key, element) => {
    const { onListSelect } = this.props;
    onListSelect(element);
    for (let i = 0; i < this.selectedListColor.length; i++) {
      this.selectedListColor[i].style.color = 'white';
    }
    this.selectedListColor[key].style.color = 'red';
  };

  changePage = (tab) => {
    const { onTabSelect } = this.props;
    onTabSelect(tab);
  };

  render() {
    const { user, dumUser } = this.props;
    let name = '';
    if (Object.keys(dumUser).length === 0 && dumUser.constructor === Object) {
      name = user.name;
    } else {
      name = dumUser.name;
    }
    return (
      <div className='sidebar'>
        <div className='heading'>Hello, {name} !</div>
        <ul id='menu'>
          <li
            className='expand-item'
            onMouseLeave={this.hideAddBox}
            onClick={() => this.changePage('list')}
          >
            My Lists
            <ul>
              {this.state.ListName.map((element, index) => {
                return (
                  <li
                    className='subitem'
                    key={index}
                    //get reference to the created li
                    ref={(ref) => (this.selectedListColor[index] = ref)}
                    onClick={() => this.selectList(index, element)}
                  >
                    {element}
                  </li>
                );
              })}
              <div className='addBox subitem' ref={this.addBoxRef}>
                {' '}
                <AddDialog addList={this.addList} user={user} />
              </div>
              <li className='addButton' ref={this.plusButtonRef}>
                <img src={plusIcon} alt='add' />
              </li>
            </ul>
          </li>
          <li className='item' onClick={() => this.changePage('profile')}>
            Profile
          </li>
          <li className='item' onClick={() => this.changePage('settings')}>
            Settings
          </li>
        </ul>{' '}
      </div>
    );
  }
}
export default Sidebar;
