const q = "tasks";

async function consumer() {
  try {
    let con = await require("amqplib").connect(
      "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
    );

    let ch = await con.createChannel();
    let _ok = await ch.assertQueue(q, { durable: false });
    ch.consume(
      q,
      msg => {
        console.log(msg.content.toString());
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
