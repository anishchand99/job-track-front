import React, { Component } from 'react';
import './line.css';
import { Line } from 'react-chartjs-2';
class LineComponent extends Component {
  render() {
    const { lineData, lineOptions } = this.props;
    return (
      <div className='line'>
        <Line data={lineData} options={lineOptions} />
      </div>
    );
  }
}

export default LineComponent;
