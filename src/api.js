import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000' // 'https://hypto.herokuapp.com'
});

const getBook = (onSuccess, market = 'BTC-LTC', exchanges = ['bittrex']) => {
  return api.get(`/orderBooks?market=${market}&exchanges=${exchanges.join(',')}`)
    .then( function( payload ) {
      onSuccess(payload);
    })
    .catch(function(error) {
      return console.log(error);
    });
};

const getVolume = (onSuccess, market = 'BTC-LTC', exchanges = ['bittrex']) => {
  return api.get(`/volume?market=${market}&exchanges=${exchanges.join(',')}`)
    .then( function( payload ) {
      onSuccess(payload);
    })
    .catch(function(error) {
      return console.log(error);
    });
};

export { getBook, getVolume };
