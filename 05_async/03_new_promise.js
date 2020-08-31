const _exec = require("child_process").exec;

const exec = (command) =>
  new Promise((resolve, reject) => {
    _exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve({ stdout, stderr });
    });
  });

exec("cat *.js missing_file | wc -l")
  .then(({ stdout, stderr }) => {
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  })
  .catch((error) => {
    console.error(`exec error: ${error}`);
  });
