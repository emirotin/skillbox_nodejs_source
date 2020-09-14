const fs = require("fs");

const text = fs.readFileSync("war-and-peace.txt", "utf-8");
let count = text.split("").filter((c) => c === "\n").length;

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Memory usage ~${Math.round(used * 100) / 100}MB`);

console.log(count);
