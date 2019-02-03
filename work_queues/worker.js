let amqp = require("amqplib");


(async function () {
  try {
    let con = await amqp.connect(
      'amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq'
    );

    let q = 'task_queue';

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

      }, {noAck: true}
    );

  } catch (error) {
    console.log("ERR:" + error);
  }
})();


