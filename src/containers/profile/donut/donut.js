import React, { Component } from 'react';
import './donut.css';
import { Doughnut } from 'react-chartjs-2';

class Donut extends Component {
  render() {
    const { donutData, donutOptions } = this.props;
    return (
      <div className='donut'>
        <Doughnut data={donutData} options={donutOptions} />
      </div>
    );
  }
}

export default Donut;
