/*
* An MQTT Client to subscribe to the topic api-engine and fetch results from the raspberry pi.
* Then store these messages on the db
*
*/

const mqtt = require('mqtt');
const config = require('./config');
const Error = require('./models/error');
const Reading = require('./models/reading');

// initialize the client
const client = mqtt.connect({
  port: config.MQTT_PORT,
  protocol: 'mqtts',
  host: config.MQTT_HOST,
  clientId: config.MQTT_CLIENT_ID,
  reconnectPeriod: 1000,
  username: config.MQTT_CLIENT_ID,
  password: config.MQTT_CLIENT_ID,
  keepalive: 300,
  rejectUnauthorized: false,
});

client.on('connect', () => {
  console.log(`Connected to Mosca at ${config.MQTT_HOST}:${config.MQTT_PORT}`);
});

// Subscribe to topic
client.subscribe('api-engine');

const apiEngine = async (message) => {
  /*
    * This function receives the message which contains the readings from
    * the temperature sensor.
    */
  const {
    humidity, temperature, isValid, errors,
  } = JSON.parse(message.toString());

  console.log({
    humidity, temperature, isValid, errors,
  });

  if (!isValid || errors > 0) {
    // Send data to error logs
    const error = new Error({
      isDataValid: isValid,
      numberOfErrors: errors,
    });
    try {
      await error.save();
    } catch (e) {
      console.log({ e });
    }
  }
  // Save new reading
  const reading = new Reading({
    humidity,
    temperature,
  });

  try {
    await reading.save();
  } catch (e) {
    console.log(e);
  }
  console.log('reading saved to the database!');

  return true;
};

client.on('message', (topic, message) => {
  // When message is received, check the topic and act accordingly
  switch (topic) {
    case 'api-engine':
      apiEngine(message);
      break;
    default:
      console.log('We dont know this topic');
  }
});
