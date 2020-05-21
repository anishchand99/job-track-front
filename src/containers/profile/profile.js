import React, { Component } from 'react';
import './profile.css';
import Donut from './donut/donut';
import LineComponent from './line/line';

const donutData = {
  labels: ['Successful', 'Rejected', 'Pending'],
  datasets: [
    {
      label: 'Application Status',
      backgroundColor: ['#3cba9f', '#7f0000', '#cccc00'],
      data: [10, 10, 10],
    },
  ],
};
const donutOptions = {
  title: {
    display: true,
    text: 'Application Status',
  },
  responsive: true,
  maintainAspectRatio: false,
};

const lineData = {
  labels: ['March', 'April', 'May'],
  datasets: [
    {
      label: 'Number of Applicaitons Daily',
      backgroundColor: ['#3cba9f', '#7f0000', '#cccc00'],
      data: [25, 15, 100],
      borderColor: '#ccf500',
      fill: false,
    },
  ],
};
const lineOptions = {
  title: {
    display: true,
    text: 'Number of Applications Daily',
  },
  responsive: true,
  maintainAspectRatio: false,
};
const initialState = {
  data: [],
  line: [],
  lineLabel: [],
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.donutData = donutData;
    this.donutOptions = donutOptions;
    this.lineData = lineData;
    this.lineOptions = lineOptions;
  }
  async componentDidMount() {
    await fetch('https://hidden-tundra-18901.herokuapp.com/getGraphs', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.user.id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let temp = [];
        temp.push(data[0].accepted);
        temp.push(data[0].rejected);
        temp.push(data[0].pending);
        this.setState({ data: temp });
        const temp2 = data[1].map((element, index) => {
          return element.count;
        });
        const temp2Labels = data[1].map((element, index) => {
          return element.day;
        });
        this.setState({ line: temp2, lineLabel: temp2Labels });
      })
      .catch((err) => console.log(err));
  }

  render() {
    this.donutData.datasets[0].data = this.state.data;
    this.lineData.datasets[0].data = this.state.line;
    this.lineData.labels = this.state.lineLabel;
    return (
      <div className='profile'>
        <div className='graph'>
          <article id='draw'>
            {' '}
            <Donut
              donutData={this.donutData}
              donutOptions={this.donutOptions}
            />
            <LineComponent
              lineData={this.lineData}
              lineOptions={this.lineOptions}
            />
          </article>
        </div>
      </div>
    );
  }
}

export default Profile;
