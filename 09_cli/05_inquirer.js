const inquirer = require("inquirer");

const questions = [
  { type: "input", name: "country", message: "What's your country?" },
  { type: "number", name: "age", message: "How old are you?" },
];

(async () => {
  const res = await inquirer.prompt(questions);
  console.log(res);
})();
