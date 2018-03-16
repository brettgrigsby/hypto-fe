import React, { Component } from 'react';

class ListExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }
  render() {
    return (
      <div>
        <div
          onClick={() => {this.setState({ expanded: !this.state.expanded })}}
          style={{height: 30, backgroundColor: '#ccebff', borderBottom: '1px solid #4db8ff', cursor: 'pointer', display: 'flex', alignItems: 'center', paddingLeft: 15}}
        >
          {this.props.name.toUpperCase()}
        </div>
        {this.state.expanded && 
          <div style={{height: 200, overflow: 'scroll'}}>
            { this.props.items.map((item, index) => {
                return(
                  <div
                  key={index}
                  style={{height: 30, backgroundColor: '#e6f5ff', borderBottom: '1px solid #4db8ff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 15}}
                  >
                    <span>Quantity: {item.Quantity}</span>
                    <span>Rate: {item.Rate}</span>
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    );
  }
};

export default ListExchange;