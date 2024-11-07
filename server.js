const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    console.log("No se ha podido conectar a este puerto");
  }
  console.log("\n#########################\n");
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Escuchando al server (http://localhost:${PORT})`
  );
});
