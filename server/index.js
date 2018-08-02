const express = require('express');
const path = require('path');
const parser = require('body-parser');
const helmet = require('helmet');
const request = require('request');

const proxy = express();
const port = 8888;

proxy.use(helmet());
proxy.use(parser.json());
proxy.use(parser.urlencoded({ extended: true }));
proxy.use(express.static(path.join(__dirname, '../')));

// proxy.get('/bundle.js/:3012', (req, res) => {
//   request('http://localhost:3012/bundle.js', (error, response, body) => {
//     console.log(typeof body);
//     res.status(200).send(body);
//   });
// });

proxy.use('/api/amenities', (req, res) => {
  request('http://localhost:3012/api/amenities', (error, response, body) => {
    if (response.statusCode === 200) {
      res.status(200).send(body);
    }
  });
});

proxy.listen(port, () => console.log(`Connected on port ${port}!!! `));
