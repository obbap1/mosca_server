require('dotenv').config();
const path = require('path');
const server = require('./server');
const config = require('./config');

const SSL_KEY = path.join(__dirname, './certs/key.pem');
const SSL_CERT = path.join(__dirname, './certs/certificate.pem');
const MONGOURL = config.DATABASE_URL;

server();

module.exports = {
  id: 'broker',
  stats: false,
  port: 8443,
  logger: {
    name: 'raspberry',
    level: 'debug',
  },
  secure: {
    keyPath: SSL_KEY,
    certPath: SSL_CERT,
  },
  backend: {
    type: 'mongodb',
    url: MONGOURL,
  },
  persistence: {
    factory: 'mongo',
    url: MONGOURL,
  },
};
