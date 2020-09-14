const fs = require("fs");

const buf = fs.readFileSync("./10_buffer.js");

const subBuf = buf.slice(27);

console.log(subBuf.toString("utf8"));

const subBuf2 = subBuf.slice(0, 5);

console.log(subBuf2.toString("hex"));
