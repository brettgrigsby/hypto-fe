import React from 'react';
import ListExchange from './ListExchange';

const OrderList = (props) => {
  const exchanges = Object.keys(props.book);
  return (
    <div style={{width: '40%', height: 300, overflow: 'hidden', boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'}}>
      <h3 style={{marginLeft: 15}}>{props.type.toUpperCase()}</h3>
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
