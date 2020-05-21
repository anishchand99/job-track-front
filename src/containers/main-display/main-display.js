import React, { Component } from 'react';
import './main-display.css';
import Records from '../records/records';
import plusIcon from '../../images/icons-plus.png';
import editIcon from '../../images/edit.png';
import checkIcon from '../../images/check.png';
import deleteIcon from '../../images/delete.png';

const intitialState = {
  //the name of the list to display
  listToDisplay: '',
  //the list to render
  listToRender: [],
  //userId
  userId: -1,
};
class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = intitialState;
    this.editDivs = [];
    this.plusButtonRef = React.createRef();
    this.newEntryRef = React.createRef();
    this.errorMsgRef = React.createRef();
    this.divEditRef = React.createRef();
    this.editButtonRef = [];
    this.deleteButtonRef = [];
    this.okButtonRef = [];
    this.deleteRowConfirmRef = React.createRef();
    this.applicationRef = React.createRef();
    this.rowRef = React.createRef();
    this.tableRowLength = 11;
    this.deleteIndex = 9999;
    this.changeCheck = this.changeCheck.bind(this);
  }

  componentDidMount() {
    this.plusButtonRef.current.addEventListener('click', () => {
      //if a list is not selected display error msg
      if (this.state.listToDisplay === '') {
        this.errorMsgRef.current.classList.add('show');
        setTimeout(() => {
          this.errorMsgRef.current.classList.remove('show');
        }, 5000);
      } else {
        this.errorMsgRef.current.classList.remove('show');
        this.newEntryRef.current.classList.add('show');
      }
    });
    this.setState({ userId: this.props.user.id });
  }

  async componentDidUpdate() {
    await this.props.getData;
    if (this.state.listToDisplay !== this.props.listToDisplay) {
      this.updateListNameSelected();
      this.getRecords();
    }
  }

  updateListNameSelected = () => {
    const { listToDisplay } = this.props;
    if (this.state.listToDisplay !== listToDisplay) {
      this.setState({
        listToDisplay: this.props.listToDisplay,
      });
    }
  };

  getRecords = () => {
    fetch('http://localhost:3005/getRecords', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listToDisplay: this.state.listToDisplay,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ listToRender: data });
      })
      .catch((err) => console.log(err));
  };

  addRecords = (tableRowObject) => {
    fetch('http://localhost:3005/addRecords', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        row: tableRowObject,
        listToDisplay: this.state.listToDisplay,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        //get the records to add the new records on the screen
        this.getRecords();
      })
      .catch((err) => console.log(err));
  };

  addList = (tableRowObject) => {
    this.tableRowLength = Object.keys(tableRowObject).length;
    //send the records list to the server side
    this.addRecords(tableRowObject);
    //hide the box after input complete
    this.hideAddBox();
  };

  hideAddBox = () => {
    this.newEntryRef.current.classList.remove('show');
  };
  //on okbutton click make div uneditable switch image
  okButton = (index) => {
    if (this.okButtonRef[index] !== null) {
      this.makeEditable(index, false);
      this.okButtonRef[index].classList.add('hidden');
      this.editButtonRef[index].classList.remove('hidden');
      let updatedRecord = {};
      for (let i = 0; i < this.tableRowLength; i++) {
        if (this.editDivs[parseInt(index + '' + i, 10)] != null) {
          if (i >= 7) {
            let indexName = this.editDivs[parseInt(index + '' + i, 10)]
              .classList.value;
            indexName = indexName.split(' ')[0];
            updatedRecord[indexName] = this.editDivs[
              parseInt(index + '' + i, 10)
            ].children[0].checked;
          } else {
            updatedRecord[
              this.editDivs[parseInt(index + '' + i, 10)].classList.value
            ] = this.editDivs[parseInt(index + '' + i, 10)].innerHTML;
          }
        }
      }
      //send the records list to the server side
      fetch('http://localhost:3005/updateRecords', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          row: updatedRecord,
          listToDisplay: this.state.listToDisplay,
          index: this.rowRef.current.getAttribute('data-id'),
        }),
      })
        .then((response) => response.json())
        .then(() => {
          //get the records to add the new records on the screen
          this.getRecords();
        })
        .catch((err) => console.log(err));
    }
  };

  //on editbutton click make div editable and switch image
  editButton = (index) => {
    if (this.editButtonRef[index] !== null) {
      this.makeEditable(index, true);
      this.editButtonRef[index].classList.add('hidden');
      this.okButtonRef[index].classList.remove('hidden');
    }
  };

  onYes = () => {
    this.deleteRowConfirmRef.current.classList.add('hidden');
    document.body.style = '  background-color: #e0bbe4; ';
    document.body.style.pointerEvents = 'all';
    //send the records list to the server side to delete from list
    fetch('http://localhost:3005/deleteRecords', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        index: this.rowRef.current.getAttribute('data-id'),
        listToDisplay: this.state.listToDisplay,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        //get the records to add the new records on the screen
        this.getRecords();
      })

      .catch((err) => console.log(err));
    this.getRecords();
  };
  onNo = () => {
    this.deleteRowConfirmRef.current.classList.add('hidden');
    document.body.style = '   background-color: #e0bbe4; ';
    document.body.style.pointerEvents = 'all';
  };
  //on okbutton click make div uneditable switch image
  deleteButton = (index) => {
    this.deleteIndex = index;
    if (this.deleteButtonRef[index] !== null) {
      this.deleteRowConfirmRef.current.classList.remove('hidden');
      //change the background as faded and disable cursor-events on other elements.
      document.body.style = ' background-color: #e0bbe4; ';
      document.body.style.pointerEvents = 'none';
    }
  };
  //make the divs editable
  makeEditable = (index, bool) => {
    for (let i = 0; i < this.tableRowLength; i++) {
      if (this.editDivs[parseInt(index + '' + i, 10)] != null) {
        this.editDivs[parseInt(index + '' + i, 10)].contentEditable = bool;
        if (i >= 7) {
          if (bool) {
            this.editDivs[parseInt(index + '' + i, 10)].classList.remove(
              'button-disabled'
            );
          } else {
            this.editDivs[parseInt(index + '' + i, 10)].classList.add(
              'button-disabled'
            );
          }
        }
      }
    }
  };

  changeCheck = (element) => {
    let fieldName = element.target.getAttribute('name');
    fieldName = fieldName.split(' ')[0];
    let newValue = element.target.checked;
    let i = element.target.getAttribute('data-index');
    // 1. Make a shallow copy of the items
    let items = [...this.state.listToRender];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[i] };
    // 3. Replace the property you're intested in
    item[fieldName] = newValue;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[i] = item;
    // 5. Set the state to our new copy
    this.setState({ listToRender: items });
  };

  render() {
    const { listToDisplay } = this.props;
    const { listToRender } = this.state;
    return (
      <div className='application' ref={this.applicationRef}>
        <div className='title'>{listToDisplay}</div>
        <div className='confirmation hidden' ref={this.deleteRowConfirmRef}>
          Are you sure?
          <div className='buttons'>
            {' '}
            <button className='yes' onClick={this.onYes}>
              Yes
            </button>
            <button className=' no' onClick={this.onNo}>
              No
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Date Applied</th>
              <th>Job Description</th>
              <th>Job Url</th>
              <th>Specific Requirements</th>
              <th>Comments</th>
              <th>Accepted</th>
              <th>Pending</th>
              <th>Rejected</th>
            </tr>
          </thead>
          {Object.keys(listToRender).length === 0 &&
          listToRender.constructor === Object ? (
            <tbody className='hidden'></tbody>
          ) : (
            //display JSON object's listToDisplay property
            listToRender.map((element, index) => {
              return (
                <tbody key={'body' + index + 1}>
                  <tr
                    key={element.app_id}
                    data-id={element.app_id}
                    ref={this.rowRef}
                  >
                    <td key={index + 'e'}>
                      <img
                        src={editIcon}
                        alt='add'
                        className='editButton'
                        ref={(ref) => (this.editButtonRef[index] = ref)}
                        onClick={() => this.editButton(index)}
                      />
                      <img
                        src={checkIcon}
                        alt='add'
                        className='editButton hidden'
                        ref={(ref) => (this.okButtonRef[index] = ref)}
                        onClick={() => this.okButton(index)}
                      />
                    </td>
                    <td key={index + 'x'}>
                      <img
                        src={deleteIcon}
                        alt='add'
                        className='deleteButton'
                        ref={(ref) => (this.deleteButtonRef[index] = ref)}
                        onClick={() => this.deleteButton(index)}
                      />
                    </td>
                    <td key={index + '0'}>
                      <div
                        className='companyname'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 0)] = ref)
                        }
                      >
                        {element.companyname}
                      </div>
                    </td>
                    <td key={index + '1'}>
                      <div
                        className='location'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 1)] = ref)
                        }
                      >
                        {element.location}
                      </div>
                    </td>
                    <td key={index + '2'}>
                      <div
                        className='dateapplied'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 2)] = ref)
                        }
                      >
                        {element.dateapplied}
                      </div>
                    </td>
                    <td key={index + '3'}>
                      <div
                        className='jobdescription'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 3)] = ref)
                        }
                      >
                        {element.jobdescription}
                      </div>
                    </td>
                    <td key={index + '4'}>
                      <div
                        className='joburl'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 4)] = ref)
                        }
                      >
                        {element.joburl}
                      </div>
                    </td>
                    <td key={index + '5'}>
                      <div
                        className='specificrequirements'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 5)] = ref)
                        }
                      >
                        {element.specificrequirements}
                      </div>
                    </td>
                    <td key={index + '6'}>
                      <div
                        className='comments'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 6)] = ref)
                        }
                      >
                        {element.comments}
                      </div>
                    </td>
                    <td key={index + '7'}>
                      <div
                        className='accepted button-disabled'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 7)] = ref)
                        }
                      >
                        <input
                          type='checkbox'
                          name='accepted'
                          checked={!!element.accepted}
                          data-index={index}
                          onChange={this.changeCheck}
                        />
                      </div>
                    </td>
                    <td key={index + '8'}>
                      <div
                        className='pending button-disabled'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 8)] = ref)
                        }
                      >
                        <input
                          type='checkbox'
                          name='pending'
                          checked={!!element.pending}
                          data-index={index}
                          onChange={this.changeCheck}
                        />
                      </div>
                    </td>
                    <td key={index + '9'}>
                      <div
                        className='rejected button-disabled'
                        ref={(ref) =>
                          (this.editDivs[parseInt(index + '' + 9)] = ref)
                        }
                      >
                        <input
                          type='checkbox'
                          name='rejected'
                          checked={!!element.rejected}
                          data-index={index}
                          onChange={this.changeCheck}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })
          )}
        </table>
        <div className='new-entry' ref={this.newEntryRef}>
          {' '}
          <Records addList={this.addList} />
        </div>
        <div className='errorMsg' ref={this.errorMsgRef}>
          Select/Create a List First!
        </div>
        <div className='addRecordButton' ref={this.plusButtonRef}>
          <img src={plusIcon} alt='add' />
        </div>
      </div>
    );
  }
}

export default MainDisplay;
