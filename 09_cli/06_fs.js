const rimraf = require("rimraf");
const mkdirp = require("mkdirp");

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

(async () => {
  await removeDir("./tmp");
  await mkdirp("./tmp/out");
})();
