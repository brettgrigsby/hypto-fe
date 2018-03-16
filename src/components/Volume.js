import React, { Component } from 'react'
import { getVolume } from '../api';
import ReactEcharts from 'echarts-for-react';

const MARKETMAX = {
  'BTC-ETH': 1500,
  'BTC-LTC': 2500
}

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
    const exchanges = Object.keys(volume);
    const allKeys = exchanges.reduce((acc, exchange) => {
      return acc.concat(Object.keys(volume[exchange]));
    }, []).sort();
    const seriesData = exchanges.map(exchange => {
      const sortedKeys =  Object.keys(volume[exchange]).sort();
      return {
        name: exchange,
        type: 'bar',
        stack: 'sure',
        data: sortedKeys.map(key => volume[exchange][key])
      };
    })
    return {
      title: {
        text: this.props.type.toUpperCase(),
        textStyle: { align: 'center' } // not working
      },
      legend: {
        data: exchanges
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        name: 'Rate',
        nameLocation: 'end',
        data: allKeys
      },
      yAxis: {
          type: 'value',
          name: 'Quantity',
          nameLocation: 'end',
          max: MARKETMAX[this.props.market]
      },
      series: seriesData
    };
  }

  componentDidMount() {
    this.pollData();
  }

  componentWillReceiveProps(nextProps) {
    const { exchanges, market } = this.props;
    if (
      nextProps.exchanges.length !== exchanges.length ||
      nextProps.market !== market
    ) {
      getVolume(this.onSuccess, market, nextProps.exchanges);
    }
  }

  pollData() {
    const { market, exchanges } = this.props;
    getVolume(this.onSuccess, market, exchanges);
    setTimeout(this.pollData.bind(this), 5000);
  }

  onSuccess({ data: { volume } }) {
    this.setState({ volume: volume[this.props.type] });
  }

  render() {
    if (!this.state.volume) { return null; }
    return (
      <ReactEcharts option={this.getOption()} notMerge />
    );
  }
};

export default Volume;
