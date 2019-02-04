#!/usr/bin/env node

let amqp = require("amqplib");

let args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: rpc_client.js num');
  process.exit(1);
}

(async function () {
  try {
    console.log("[*] Connecting");
    let conn = await amqp.connect(
      'amqp://localhost');

    let ch = await conn.createChannel();

    let q = await ch.assertQueue('', {exclusive: true});
    let corr = generateUuid();
    let num = parseInt(args[0]);

    console.log(`[x] Requesting fib(${num})`);

    ch.consume(q.queue, (msg) => {
      if (msg.properties.correlationId === corr) {
        console.log(`[.] Got ${msg.content.toString()}`);

        setTimeout(() => {conn.close();process.exit(0)}, 1500);
      }
    },{noAck:true});




    ch.sendToQueue(
      'rpc_queue',
      Buffer.from(num.toString()),
      {correlationId: corr, replyTo: q.queue});


  } catch (error) {
    console.log("ERR:" + error);
  }
})();

function generateUuid() {
  return Math.random().toString() +
    Math.random().toString() +
    Math.random().toString();
}

