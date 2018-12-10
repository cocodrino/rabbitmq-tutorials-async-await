function promisify(func) {
  return (...args) =>
    new Promise((resolve, reject) => {
      const callback = (err, data) => (err ? reject(err) : resolve(data));

      func.apply(this, [...args, callback]);
    });
}

export default function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

//from https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/

async function start() {
  let [err, conn] = amqp.connect("");
  if (err) {
  }

  conn.on("error", handleError);
  conn.on("close", handleClose);
}

//publisher

async function connect(cb) {
  try {
    let conn = await require("amqplib").connect("");
    let ch = await conn.createChannel();
    await ch.assertQueue("task");
    ch.sendToQueue("task", Buffer.from("algo que hacer"));
  } catch (e) {
    return cb("error conectando");
  }
}

//revisar https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html
