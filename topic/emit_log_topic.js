#!/usr/bin/env node

let amqp = require("amqplib");

(async function () {
  try {
    console.log("[*] Connecting");
    let conn = await amqp.connect(
      'amqp://localhost');

    let ch = await conn.createChannel();

    let ex = 'topic_logs';

    let args = process.argv.slice(2);
    let key = (args.length > 0) ? args[0] : 'anonymous.info';
    let msg = args.slice(1).join(' ') || 'Hello World!';

    ch.assertExchange(ex,'topic', {durable: false});
    ch.publish(ex, key, Buffer.from(msg));

    console.log(`[x] Sent ${key}: '${msg}'`);

    setTimeout(() => {
      conn.close();
      process.exit(0)
    }, 500);


  } catch (error) {
    console.log("ERR:" + error);
  }
})();


