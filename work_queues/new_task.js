let amqp = require("amqplib");

(async function () {
  try {
    console.log("[*] Connecting");
    let conn = await amqp.connect(
      'amqp://localhost'
    );

    let ch = await conn.createChannel();

    let q = 'task_queue';

    let msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, Buffer.from(msg),{persistent: true});

    console.log(`[x] Sent '${msg}'`);

    setTimeout(() => {
      conn.close();
      process.exit(0)
    }, 500);


  } catch (error) {
    console.log("ERR:" + error);
  }
})();


