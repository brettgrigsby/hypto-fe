import React, { Component } from 'react'
import { getBook } from '../api';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBook: {
        asks: [],
        bids: []
      }
    }
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    getBook(this.onSuccess);
  }

  onSuccess({ data }) {
    console.log(data);
    this.setState({ orderBook: data.book });
  }

  render() {
    return (
      <div>
        Here be the main! {this.state.orderBook.asks.length}
      </div>
    );
  }
};

export default Main;
