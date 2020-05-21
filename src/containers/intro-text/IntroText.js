import React, { Component } from 'react';
import './IntroText.css';

class IntroText extends Component {
  render() {
    return (
      <div className='appInfo'>
        This app is designed to Keep a track of Job opportunites that you have
        applied to.
        <p>
          This app has features to add a list that can be used to divide the job
          into categories. For example: a job search list featuring applications
          for internships and a seperate list featuring applications for full
          time positions.
        </p>
        <p>
          The app allows you to add the details about the job including
          description, location, job url, job requirements, decision and other
          additional comments. Futher you can have visualization features that
          can be used to see the currrent progress and rate of your job search
          including doughnut and line chart.
        </p>
      </div>
    );
  }
}
export default IntroText;
