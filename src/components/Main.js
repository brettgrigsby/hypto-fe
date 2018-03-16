import React, { Component } from 'react'
import { getBook, getVolume } from '../api';
import Volume from './Volume';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: ['bittrex'],
      orderBook: {
        asks: [],
        bids: []
      }
    }
    this.onBookSuccess = this.onBookSuccess.bind(this);
  }

  componentDidMount() {
    this.pollData();
  }

  pollData() {
    getBook(this.onBookSuccess);
    setTimeout(this.pollData.bind(this), 15000);
  }

  onBookSuccess({ data }) {
    console.log('hit on success');
    this.setState({ orderBook: data.book });
  }

  render() {
    return (
      <div>
        <h1>Hypto</h1>
        <h4>Where your dreams aren't just dreams</h4>
        Here be the main! {this.state.orderBook.asks.length}
        <div style={{height: 300, width: 300, display: 'inline-block'}} >
          <Volume type="bids" market={'BTC-LTC'} exchanges={this.state.exchanges}/>
        </div>
        <div style={{height: 300, width: 300, display: 'inline-block'}} >
          <Volume type="asks" market={'BTC-LTC'} exchanges={this.state.exchanges}/>
        </div>
      </div>
    );
  }
};

export default Main;
