let amqp = require("amqplib");

(async function () {
  try {
    console.log("[*] Connecting");
    let conn = await amqp.connect(
      'amqp://localhost'
    );

    let ch = await conn.createChannel();
    let q = 'hello';

    ch.assertQueue(q, {durable: false});

    ch.sendToQueue(q, Buffer.from("Hello!"));
    console.log("[x] Sent 'Hello World'");

    setTimeout(() => {
      conn.close();
      process.exit(0)
    }, 500);


  } catch (error) {
    console.log("ERR:" + error);
  }
})();


