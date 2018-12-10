var _ = require("lodash");

const q = "tasks";

async function amqp() {
  try {
    let con = await require("amqplib").connect(
      "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
    );

    let ch = await con.createChannel();
    let _ok = await ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, Buffer.from("Enviando mensaje"));

    _.range(10).forEach(_e => {
      ch.sendToQueue(q, Buffer.from("[*] mensaje nro " + _e));
    });

    console.log("mensajes enviados");
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
  }, 5000);
});
