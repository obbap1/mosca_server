const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true });
