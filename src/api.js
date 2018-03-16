import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hypto.herokuapp.com'
});

const getBook = (onSuccess, market = 'BTC-LTC') => {
  console.log('hit api')
  return api.get(`/orderBooks?market=${market}`)
    .then( function( payload ) {
      onSuccess(payload);
    })
    .catch(function(error) {
      return console.log(error);
    });
};

const getVolume = (onSuccess, market = 'BTC-LTC') => {
  console.log('hit volume api')
  return api.get(`/volume?market=${market}`)
    .then( function( payload ) {
      onSuccess(payload);
    })
    .catch(function(error) {
      return console.log(error);
    });
};

export { getBook, getVolume };
