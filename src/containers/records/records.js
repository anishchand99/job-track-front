import React, { Component } from 'react';
import './records.css';
const initialState = {
  record: {
    companyname: '',
    location: '',
    joburl: '',
    dateapplied: '',
    jobdescription: '',
    specificrequirements: '',
    comments: '',
    accepted: false,
    rejected: false,
    pending: false,
  },
};
class Record extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.compRef = React.createRef();
    this.dateRef = React.createRef();
    this.urlRef = React.createRef();
    this.jobRef = React.createRef();
    this.commentsRef = React.createRef();
    this.requireRef = React.createRef();
    this.locationRef = React.createRef();
    this.AcceptedRef = React.createRef();
    this.RejectedRef = React.createRef();
    this.PendingRef = React.createRef();
    // this.EmailedRef = React.createRef();
  }

  onNameChange = (event) => {
    this.setState({
      record: { ...this.state.record, companyname: event.target.value },
    });
  };
  onJobChange = (event) => {
    this.setState({
      record: { ...this.state.record, jobdescription: event.target.value },
    });
  };
  onJobUrlChange = (event) => {
    this.setState({
      record: { ...this.state.record, joburl: event.target.value },
    });
  };
  onDateChange = (event) => {
    this.setState({
      record: { ...this.state.record, dateapplied: event.target.value },
    });
  };
  onLocationChange = (event) => {
    this.setState({
      record: { ...this.state.record, location: event.target.value },
    });
  };
  onSpecificChange = (event) => {
    this.setState({
      record: {
        ...this.state.record,
        specificrequirements: event.target.value,
      },
    });
  };
  onCommentsChange = (event) => {
    this.setState({
      record: { ...this.state.record, comments: event.target.value },
    });
  };

  onAcceptedClick = () => {
    this.setState({
      record: {
        ...this.state.record,
        accepted: this.AcceptedRef.current.checked,
      },
    });
  };

  onRejectedClick = () => {
    this.setState({
      record: {
        ...this.state.record,
        rejected: this.RejectedRef.current.checked,
      },
    });
  };

  onPendingClick = () => {
    this.setState({
      record: {
        ...this.state.record,
        pending: this.PendingRef.current.checked,
      },
    });
  };

  // onEmailedClick = () => {
  //   this.setState({
  //     record: {
  //       ...this.state.record,
  //       emailed: this.EmailedRef.current.checked,
  //     },
  //   });
  // };

  addItem = () => {
    const { addList } = this.props;
    this.clearInputFields();
    addList(this.state.record);
  };

  clearInputFields = () => {
    this.compRef.current.value = '';
    this.compRef.current.value = '';
    this.dateRef.current.value = '';
    this.urlRef.current.value = '';
    this.jobRef.current.value = '';
    this.commentsRef.current.value = '';
    this.requireRef.current.value = '';
    this.locationRef.current.value = '';
    this.AcceptedRef.current.value = false;
    this.PendingRef.current.value = false;
    this.RejectedRef.current.value = false;
    // this.EmailedRef.current.value = false;
  };

  render() {
    return (
      <div className='record'>
        <table>
          <thead>
            <tr>
              <th>
                <div>
                  {' '}
                  <input
                    className='name'
                    type='text'
                    onChange={this.onNameChange}
                    ref={this.compRef}
                    placeholder='Company Name'
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    className='name'
                    type='text'
                    onChange={this.onLocationChange}
                    ref={this.locationRef}
                    placeholder='Location'
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    className='name'
                    type='text'
                    onChange={this.onDateChange}
                    ref={this.dateRef}
                    placeholder='Date Applied'
                    readOnly='readOnly'
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    className='name'
                    type='text'
                    onChange={this.onJobChange}
                    ref={this.jobRef}
                    placeholder='Job Description'
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    className='name'
                    type='text'
                    onChange={this.onJobUrlChange}
                    ref={this.urlRef}
                    placeholder='Job Url'
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    className='name'
                    type='text'
                    onChange={this.onSpecificChange}
                    ref={this.requireRef}
                    placeholder='Specific Requirements'
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    className='name'
                    type='text'
                    onChange={this.onCommentsChange}
                    ref={this.commentsRef}
                    placeholder='Comments'
                  />
                </div>
              </th>
              <th>
                <div className='checkboxes'>
                  Accepted :
                  <input
                    type='checkbox'
                    onClick={this.onAcceptedClick}
                    ref={this.AcceptedRef}
                  />
                </div>
              </th>
              <th>
                <div className='checkboxes'>
                  Rejected :
                  <input
                    type='checkbox'
                    onClick={this.onRejectedClick}
                    ref={this.RejectedRef}
                  />
                </div>
              </th>
              <th>
                <div className='checkboxes'>
                  Pending :
                  <input
                    type='checkbox'
                    onClick={this.onPendingClick}
                    ref={this.PendingRef}
                  />
                </div>
              </th>
              <th>
                <div>
                  <button className='add' onClick={this.addItem}>
                    add
                  </button>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
export default Record;
