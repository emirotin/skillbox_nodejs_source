console.log("OK");

process.on("exit", () => {
  console.log("Exiting");
  setTimeout(() => {
    console.log("Some more work to do");
  }, 5000);
});
