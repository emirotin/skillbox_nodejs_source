require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");

const options = {
  key: fs.readFileSync(path.resolve(__dirname, process.env.KEYS_FOLDER, "key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, process.env.KEYS_FOLDER, "cert.pem")),
};

const PORT = 9000;

https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("hello world\n");
  })
  .listen(PORT, () => {
    console.log(`  Listening https://localhost:${PORT}`);
  });
