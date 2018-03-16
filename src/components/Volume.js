import React, { Component } from 'react'
import { getVolume } from '../api';
import ReactEcharts from 'echarts-for-react';

class Volume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: {}
    }
    this.onSuccess = this.onSuccess.bind(this);
  }

  getOption() {
    const { volume } = this.state;
    return {
      // title: {
      //   text: this.props.type.toUpperCase(),
      //   textStyle: { align: 'center' } // not working
      // },
      xAxis: {
        type: 'category',
        data: Object.keys(volume)
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: Object.keys(volume).map(k => volume[k]),
          type: 'bar'
      }]
    };
  }

  componentDidMount() {
    this.pollData();
  }

  pollData() {
    getVolume(this.onSuccess, this.props.market);
    setTimeout(this.pollData.bind(this), 5000);
  }

  onSuccess({ data: { volume } }) {
    this.setState({ volume: volume[this.props.type] });
  }

  render() {
    return (
      <ReactEcharts option={this.getOption()} />
    );
  }
};

export default Volume;
