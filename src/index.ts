import { quotes } from './quotes';
const Twit = require("twit");
const nodeSChedule = require('node-schedule')
require('dotenv').config();

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: false,     // optional - requires SSL certificates to be valid.
});

let quoteCount = 0;

const dailySchedule = nodeSChedule.scheduleJob('0 59 23', () => {
  if (quoteCount > quotes.length - 1) {
    process.exit()
  }
  T.post('statuses/update', { status: quotes[quoteCount] }, function (err: any, data: any, response: any) {
    try {
      if (err) {
        console.trace(err)
      }
      console.log(`posted quote: ${quotes[quoteCount]}`);
      quoteCount++;
    }
    catch (e) {
      console.log(e);
    }
  })
});
