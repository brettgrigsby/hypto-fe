import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000'
});

const getBook = (onSuccess, bookName = 'BTC-LTC') => {
  console.log('hit api')
  return api.get('/')
    .then( function( payload ) {
      onSuccess(payload);
    })
    .catch(function(error) {
      return console.log(error);
    });
};

export { getBook };
