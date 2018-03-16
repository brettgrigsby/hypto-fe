# Hypto-FE

Hypto-FE is a React web application that consumes the Hypto expressJs service. It allows you to adjust which exchanges you would like volume data on and also to change to different symbols. Specifially `BTC-ETH` and `BTC-LTC`. FE relys on the data that is constanly fetched and updated by the backend so it can afford to do more manipulation on the front. One of those being turning the volume data is some pleasing graphs from the [ECHARTS](https://ecomfe.github.io/echarts-doc/public/en/index.html) library, which I really liked and would highly recommend. Each chart component polls its own data, which means we could really plaster the page with very specific graphs if we chose to.

Speaking of polling, The components in charge of fetching data are doing polling at a slightly longer interval than the backend. I went a bit poll-crazy, but it was fun to watch the app update in (almost) real-time.

### Was that a good idea?

It was! But of course if I had to do it over with more time, I would have tried a web-sockets approach. A lot of the exchange APIs are supporting them now, and would have been even more REAL-TIME. Other improvements I would make would be adding a css-in-js library instead of using inline-styling like I've done, and adding some more pages so I could have only a few components showing to present to data more elegantly.

## License

Copyright © Nothing To See Here LLC