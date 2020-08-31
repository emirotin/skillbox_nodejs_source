/* eslint-disable */

const fs = require("fs");

fs.writeFileSync("test.txt", "works", "utf8", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(data);
  });
});
