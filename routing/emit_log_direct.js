#!/usr/bin/env node

let amqp = require("amqplib");

(async function () {
  try {
    console.log("[*] Connecting");
    let conn = await amqp.connect(
      'amqp://localhost');

    let ch = await conn.createChannel();

    let ex = 'direct_logs';

    let args = process.argv.slice(2);
    let msg = args.slice(1).join(' ') || 'Hello World!';
    let severity = (args.length > 0) ? args[0] : 'info';

    ch.assertExchange(ex,'direct', {durable: false});
    ch.publish(ex, severity, Buffer.from(msg));

    console.log(`[x] Sent '${msg}'`);

    setTimeout(() => {
      conn.close();
      process.exit(0)
    }, 500);


  } catch (error) {
    console.log("ERR:" + error);
  }
})();


