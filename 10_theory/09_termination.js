process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  process.exit(1);
});

require("fs").readFileSync("nonexistent");

process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection", reason);
  process.exit(1);
});

new Promise((_resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Not good"));
  }, 100);
});

setInterval(() => {
  console.log("Working...");
}, 1000);

process.on("SIGINT", (exitCode) => {
  console.error("Terminating with code", exitCode);
  process.exit();
});
