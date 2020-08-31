const express = require("express");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("public"));

let count = 0;

app.post("/inc", (req, res) => {
  const data = req.body || {};
  count += data.value || 1;
  res.json({ count });
});

const uikitCss = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/css/uikit.min.css" />';

app.get("/", (_req, res) => {
  const counts = [];
  for (let i = 0; i < count; i++) {
    counts.push(99 - i);
  }
  res.render("index", { count, uikitCss, counts });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
