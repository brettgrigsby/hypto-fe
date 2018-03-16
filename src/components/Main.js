import React, { Component, Fragment } from 'react'
import { getBook } from '../api';
import Volume from './Volume';
import OrderList from './OrderList';

const EXCHANGES = ['bittrex', 'poloniex', 'bitfinex'];
const CURRENCIES = ['BTC-ETH', 'BTC-LTC'];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExchanges: Object.assign([], EXCHANGES),
      currentCurrency: CURRENCIES[0],
      orderBook: {}
    }
    this.onBookSuccess = this.onBookSuccess.bind(this);
    this.toggleExchange = this.toggleExchange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  componentDidMount() {
    this.pollData();
  }

  pollData() {
    getBook(this.onBookSuccess, this.state.currentCurrency, this.state.currentExchanges);
    setTimeout(this.pollData.bind(this), 15000);
  }

  onBookSuccess({ data }) {
    if(data.book) {
      this.setState({ orderBook: data.book });
    }
  }

  toggleExchange(exchange) {
    let currentExchanges = Object.assign([], this.state.currentExchanges);
    const index = currentExchanges.indexOf(exchange);
    if (index === -1) {
      currentExchanges = [...currentExchanges, exchange]
      this.setState({currentExchanges})
    } else if (currentExchanges.length > 1) {
      currentExchanges.splice(index, 1)
      this.setState({ currentExchanges })
    }
    getBook(this.onBookSuccess, this.state.currentCurrency, currentExchanges);
  }

  handleCurrencyChange(event) {
    this.setState({ currentCurrency: event.target.value });
  }

  getTotalForType(volume) {
    const rawTotal = Object.keys(volume).reduce((sum, exchange) => {
      return volume[exchange].reduce((acc, order) => {
        return acc + parseFloat(order.Quantity);
      }, 0) + sum;
    }, 0);
    return Math.round(rawTotal * 100) / 100;
  }

  getTotalVolume() {
    const { asks, bids } = this.state.orderBook;
    if(!(asks && bids)) { return {}; }  
    return {
      asks: this.getTotalForType(asks),
      bids: this.getTotalForType(bids)
    }
  }

  render() {
    const { currentExchanges, orderBook } = this.state;
    const totalVolume = this.getTotalVolume();
    if (!Object.keys(orderBook).length) { return <h1>soon...</h1>}
    return (
      <div>
        <div
          style={{
            padding: '5px 15px', 
            backgroundColor: 'rgba(0, 172, 230, 0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h1>Hypto</h1>
          <div style={{marginRight: 60, display: 'flex'}}>
            <select value={this.state.currentCurrency} onChange={this.handleCurrencyChange}>
              {CURRENCIES.map(currency => (
                <option value={currency} key={currency}>{currency}</option>
              ))}
            </select>
            { EXCHANGES.map(exchange => (
              <div key={exchange} style={{display: 'flex', margin: '0 15px', alignItems: 'center'}}>
                <input
                  id={exchange}
                  type="checkbox"
                  checked={currentExchanges.includes(exchange)}
                  onClick={() => this.toggleExchange(exchange)}
                />
                <label htmlFor={exchange}>
                  {exchange.toUpperCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding: 15}}>
          <div style={{marginTop: 15}}>
            <h2 style={{textAlign: 'center'}}>
              Total Volume {
                (totalVolume.asks && totalVolume.bids) &&
                  <Fragment>
                    - Asks: {totalVolume.asks} | Bids: {totalVolume.bids}
                  </Fragment>
              }
            </h2>
            <div style={{height: 300, width: '50%', display: 'inline-block'}} >
              <Volume type="bids" market={this.state.currentCurrency} exchanges={currentExchanges}/>
            </div>
            <div style={{height: 300, width: '50%', display: 'inline-block'}} >
              <Volume type="asks" market={this.state.currentCurrency} exchanges={currentExchanges}/>
            </div>
          </div>
          <div style={{marginTop: 15}}>
            <h2 style={{textAlign: 'center'}}>All Orders</h2>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <OrderList type="bids" book={this.state.orderBook.bids} />
              <OrderList type="asks" book={this.state.orderBook.asks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
