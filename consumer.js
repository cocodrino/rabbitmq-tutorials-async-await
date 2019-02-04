const q = "tasks";

async function consumer() {
  try {
    console.log("[*] Connecting");
    let con = await require("amqplib").connect(
      "amqp://localhost"
    );

    let ch = await con.createChannel();
    let _ok = await ch.assertQueue(q, { durable: false });
    console.log("[*] Waiting Messages");
    console.log("------------------------");
    ch.consume(
      q,
      msg => {
        console.log(`[*] Msg received: ${msg.content.toString()} \n\n`);
      },
      { noAck: true }
    );
  } catch (error) {
    console.log("ERR:" + error);
  }
}

(async function() {
  await consumer();
})();
