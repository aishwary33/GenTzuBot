const Twit = require("twit");
const scheduleJob = require('node-schedule')
const app = require('express')();
require('dotenv').config();

import { quotes } from './quotes';

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: false,     // optional - requires SSL certificates to be valid.
});

let quoteCount = 0;

const rule = new scheduleJob.RecurrenceRule();

rule.dayOfWeek = [0];
rule.hour = 17;
rule.minute = 0;

const dailySchedule = scheduleJob.scheduleJob(rule, () => {
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


app.listen(3000,console.log('listening on 3000'))