/* eslint-disable */

const fs = require("fs");

const writeFileWithCheck = (path, data, cb) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      cb(err);
      return;
    }
    fs.readFile(path, "utf8", (err, readData) => {
      if (err) {
        cb(err);
        return;
      }
      if (readData !== data) {
        cb(new Error("Data mismatch"));
        return;
      }
      cb();
    });
  });
};
