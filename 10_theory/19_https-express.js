require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");

const options = {
  key: fs.readFileSync(path.resolve(__dirname, process.env.KEYS_FOLDER, "key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, process.env.KEYS_FOLDER, "cert.pem")),
};

const PORT = 9000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`  Listening https://localhost:${PORT}`);
});
