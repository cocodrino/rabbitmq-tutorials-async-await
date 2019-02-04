#!/usr/bin/env node

let amqp = require("amqplib");

let args = process.argv.slice(2);

if (args.length === 0){
  console.log('Usage: receive_logs_topic.js <facility>.<severity>');
  process.exit(1);
}

(async function () {
  try {
    let con = await amqp.connect(
      'amqp://localhost'
    );

    let ex = 'topic_logs';
    // check work_queues_with_prefetch

    let ch = await con.createChannel();
    ch.assertExchange(ex, 'topic', {durable: false});

    let q = await ch.assertQueue('', {exclusive: true});

    console.log(`[*] Waiting for logs. To exit press Ctrl+C`);

    args.forEach(key=>ch.bindQueue(q.queue, ex, key));

    ch.consume(
      q.queue, msg => {

        console.log(`[*] Received: ${msg.content.toString()}`);

      }, {noAck: true} // check branch work_queues_message_acknowledgment
    );

  } catch (error) {
    console.log("ERR:" + error);
  }
})();


