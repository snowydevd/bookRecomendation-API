require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const net = require("net");
const PORT = 3000;

const uri =
  "mongodb+srv://lautarochinikiba:ZFOprnn6FsaEurV9@interested-books-api.hlx19.mongodb.net/?retryWrites=true&w=majority&appName=interested-books-api";

const app = express();
app.use(express.json());

function checkPort(port, callback) {
  const server = net.createServer();

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      callback(false);
    } else {
      callback(err);
    }
  });

  server.once("listening", () => {
    server.close();
    callback(true);
  });

  server.listen(port);
}

function startServer(port) {
  checkPort(port, (isAvailable) => {
    if (isAvailable) {
      app.listen(port, () => {
        console.log(
          "\x1b[36m%s\x1b[0m",
          `Escuchando al server (http://localhost:${PORT})`
        );
      });
    } else {
      console.log(`${port} is already in use, changing port to: ${port + 1}`);
      startServer(port + 1);
    }
  });
}

// ############ MongoDB Connection ############
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("\x1b[32m" + "MongoDB connnected");
  } finally {
    await client.close();
  }
}
// ############ MongoDB Connection ############

runMongoDB().catch(console.dir);
startServer(PORT);
