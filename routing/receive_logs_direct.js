#!/usr/bin/env node

let amqp = require("amqplib");

let args = process.argv.slice(2);

if (args.length === 0){
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

(async function () {
  try {
    let con = await amqp.connect(
      'amqp://localhost'
    );

    let ex = 'direct_logs';
    // check work_queues_with_prefetch

    let ch = await con.createChannel();
    ch.assertExchange(ex, 'direct', {durable: false});

    let q = await ch.assertQueue('', {exclusive: true});

    console.log(`[*] Waiting for logs. To exit press Ctrl+C`);

    args.forEach(severity=>ch.bindQueue(q.queue, ex, severity));

    ch.consume(
      q.queue, msg => {

        console.log(`[*] Received: ${msg.content.toString()}`);

      }, {noAck: true} // check branch work_queues_message_acknowledgment
    );

  } catch (error) {
    console.log("ERR:" + error);
  }
})();


