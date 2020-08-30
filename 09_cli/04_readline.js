const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Password? ", (answer) => {
  console.log(`Your answer: ${answer}`);

  rl.close();
});
