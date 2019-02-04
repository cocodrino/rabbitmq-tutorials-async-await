let amqp = require("amqplib");

(async function () {
  try {
    console.log("[*] Connecting");
    let conn = await amqp.connect(
      'amqp://localhost');

    let ch = await conn.createChannel();

    let ex = 'logs';

    let msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex,'fanout', {durable: false});
    ch.publish(ex, '', Buffer.from(msg));

    console.log(`[x] Sent '${msg}'`);

    setTimeout(() => {
      conn.close();
      process.exit(0)
    }, 500);


  } catch (error) {
    console.log("ERR:" + error);
  }
})();


