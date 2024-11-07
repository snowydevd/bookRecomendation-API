const express = require("express");
const net = require("net");
const PORT = 3000;

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

startServer(PORT);
