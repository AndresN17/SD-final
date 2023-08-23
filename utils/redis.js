const redis = require('redis');

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on('error', (err) => {
    console.log(`Error: ${err}`);
});

module.exports = client;