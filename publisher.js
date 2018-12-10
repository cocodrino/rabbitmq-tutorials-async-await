var _ = require("lodash");

const q = "tasks";

async function amqp() {
  try {
    console.log("[*] Connecting");
    let con = await require("amqplib").connect(
      "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
    );

    let ch = await con.createChannel();
    let _ok = await ch.assertQueue(q, { durable: false });
    console.log(`[*] sending Hello message`);
    ch.sendToQueue(q, Buffer.from("Hello!"));

    _.range(10).forEach(m => {
      console.log(`[*] sending message ${m} from loop`);
      ch.sendToQueue(q, Buffer.from("[*] message n: " + m));
    });

    console.log("[*] messages were sended");
    return con;
    //con.close();
  } catch (error) {
    console.log("ERR:" + error);
  }
}

/* (async function() {
  await amqp();
})(); */

amqp().then(con => {
  setTimeout(function() {
    con.close();
    process.exit(0);
  }, 500);
});
