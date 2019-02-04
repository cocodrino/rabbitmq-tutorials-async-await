let amqp = require("amqplib");


(async function () {
  try {
    let con = await amqp.connect(
      'amqp://localhost'
    );

    let q = 'task_queue';
    // check work_queues_with_prefetch

    let ch = await con.createChannel();
    ch.assertQueue(q, {durable: true});
    console.log(`[*] Waiting Messages in ${q}. To exit press Ctrl+C`);

    ch.consume(
      q, msg => {
        let secs = msg.content.toString().split('.').length - 1;

        console.log(`[*] Received: ${msg.content.toString()}`);

        setTimeout(() => {
          console.log('[x] Done');
        },secs*1000);

      }, {noAck: true} // check branch work_queues_message_acknowledgment
    );

  } catch (error) {
    console.log("ERR:" + error);
  }
})();


