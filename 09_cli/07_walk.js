const fs = require("fs").promises;
const path = require("path");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const walk = require("walk");

const removeDir = (dir) =>
  new Promise((resolve, reject) => {
    rimraf(dir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const printDirs = (dir) =>
  new Promise((resolve) => {
    const walker = walk.walk(dir);

    walker.on("directory", (root, dirStats, next) => {
      console.log(path.join(root, dirStats.name));
      next();
    });

    walker.on("end", resolve);
  });

(async () => {
  await removeDir("./tmp");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      await mkdirp(`./tmp/a${i}/b${j}`);
      await fs.writeFile(`./tmp/a${i}/b${j}/t${i}${j}.txt`, `${i} ${j}`, "utf8");
    }
  }
  await printDirs("./tmp");
})();
