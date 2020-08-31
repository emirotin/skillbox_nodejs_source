/* eslint-disable */

const fs = require("fs").promises;

const writeFileWithCheck = (path, data) => {
  return fs
    .writeFile(path, data)
    .then(() => {
      return fs.readFile(path, "utf8");
    })
    .then((readData) => {
      if (readData !== data) {
        throw new Error("Data mismatch");
      }
    });
};
