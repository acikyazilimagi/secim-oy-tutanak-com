import { spawn, Thread, Worker } from "threads";
import { Client, LocalAuth } from "whatsapp-web.js";

//
const fs = require("fs");

//Utils
const { parseMessage } = require("./lib/parseMessage");

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", qr => {
  console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

async function addToQueue(message: any) {
  //Download Task
  async function downloadTask() {
    console.log("Downloading...");
    return message.media.download().then((file: any) => {
      const ext = message.media.specs.mimetype.split("/")[1] || ".jpg";
      //
      try {
        const filename = `./images/${message.id}.${ext}`;
        fs.writeFileSync(filename, Buffer.from(file.data, "base64"));
        console.log("Success!");
        return filename;
      } catch (error) {
        console.error(error);
        return null;
      }
      //
    });
  }

  if (message.type == "media") {
  }
}

client.on("message", msg => {
  parseMessage(msg).then((parsedMessage: any) => {
    //Respond Only if its in accepted format.
    if (parsedMessage) {
      // msg.reply("Received.");
      console.log("Accepted message type");
      addToQueue(parsedMessage);
    } else {
      console.log("Rejected message type");
    }

    //Print
    console.log(parsedMessage);

    if (msg.body == "!ping") {
      msg.reply("Pong.");
    }
  });
  //
});

//# Init
// client.initialize();

//Child v1
// const auth = await spawn(new Worker("./dingo"));
// auth.runner(downloadTask).then((result) => {
//   Thread.terminate(auth);
// });

//Child v2
// const fork = require("child_process").fork;
// const tmp = require("tmp");

// function createWorker(task) {
//   const tempFn = tmp.fileSync();
//   fs.writeFileSync(tempFn.name, `process.on('message',${task.toString()})`);

//   return fork(tempFn.name);
// }

// const Z = 1;
// const test = () => {
//   console.log(Z);
// };
// const worker = createWorker((fn) => fn());

// worker.on("message", (msg) => console.log(msg));
// worker.send(test);

//Download result;
//  {
//     data,
//     mimetype: msg.mimetype,
//     filename: msg.filename,
//     filesize: msg.size
// };
