import React, { Component } from 'react';
import ListExchange from './ListExchange';

const OrderList = (props) => {
  const exchanges = Object.keys(props.book);
  return (
    <div style={{padding: 10, width: '40%', height: 300, overflow: 'hidden', border: '1px solid black'}}>
      <h3>{props.type.toUpperCase()}</h3>
      <div style={{width: '100%', height: 250}}>
        {exchanges.map((exchange, index) => {
          return (
            <ListExchange name={exchange} items={props.book[exchange]} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
