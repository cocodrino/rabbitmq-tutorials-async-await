let amqp = require("amqplib");


(async function () {
  try {
    let con = await amqp.connect(
      'amqp://localhost'
    );

    let q = 'hello';

    let ch = await con.createChannel();
    ch.assertQueue(q, {durable: false});
    console.log(`[*] Waiting Messages in ${q}. To exit press Ctrl+C`);

    ch.consume(
      q, msg => {
        console.log(`[*] Received: ${msg.content.toString()}`);
      }, {noAck: true}
    );

  } catch (error) {
    console.log("ERR:" + error);
  }
})();


