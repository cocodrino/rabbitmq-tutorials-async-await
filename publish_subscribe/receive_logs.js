let amqp = require("amqplib");


(async function () {
  try {
    let con = await amqp.connect(
      'amqp://localhost'
    );

    let ex = 'logs';
    // check work_queues_with_prefetch

    let ch = await con.createChannel();
    ch.assertExchange(ex,'fanout', {durable: false});

    let q = await ch.assertQueue('', {exclusive: true});

    console.log(`[*] Waiting Messages in ${q}. To exit press Ctrl+C`);
    ch.bindQueue(q.queue, ex, '');

    ch.consume(
      q.queue, msg => {

        console.log(`[*] Received: ${msg.content.toString()}`);

      }, {noAck: true} // check branch work_queues_message_acknowledgment
    );

  } catch (error) {
    console.log("ERR:" + error);
  }
})();


