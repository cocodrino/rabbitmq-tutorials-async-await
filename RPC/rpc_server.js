#!/usr/bin/env node

let amqp = require("amqplib");

(async function () {
  try {
    let con = await amqp.connect(
      'amqp://localhost'
    );

    let ch = await con.createChannel();

    let q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log('[x] Awaiting RPC requests');

    ch.consume(q, (msg) => {
      let n = parseInt(msg.content.toString());


      console.log(`[.] fib(${n})`);

      let r = fibonacci(n);

      ch.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(r.toString()),
          {correlationId: msg.properties.correlationId});

      ch.ack(msg);
    });


  } catch (error) {
    console.log("ERR:" + error);
  }
})();

function fibonacci(n) {
  if (n === 0 || n === 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}


