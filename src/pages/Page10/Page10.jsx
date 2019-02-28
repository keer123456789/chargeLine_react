import React, { Component } from 'react';
import OverviewBoard from './components/OverviewBoard';
import ChartBar from './components/ChartBar';
import ChartTypeLine from './components/ChartTypeLine';


export default class Page10 extends Component {
  static displayName = 'Page10';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page10-page">
        <OverviewBoard />
        <ChartBar />
        {/*<ChartTypeLine />*/}

      </div>
    );
  }
}
