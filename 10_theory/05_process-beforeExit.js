console.log("OK");

process.on("beforeExit", () => {
  console.log("About to exit");
  setTimeout(() => {
    console.log("Some more work to do");
  }, 1500);
});

process.on("exit", () => {
  console.log("Exiting");
});
