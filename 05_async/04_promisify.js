const fs = require("fs");
const util = require("util");
const stat = util.promisify(fs.stat);

stat("some-file.txt")
  .then((stats) => {
    console.log(stats);
  })
  .catch((err) => {
    console.error(err);
  });
