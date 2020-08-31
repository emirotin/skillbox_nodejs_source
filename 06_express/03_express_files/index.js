const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const multer = require("multer");
const nunjucks = require("nunjucks");

const app = express();
const uploadsDir = path.join(__dirname, "public", "uploads");
const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype.match(/^image\//));
};
const upload = multer({
  dest: uploadsDir,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", async (_req, res) => {
  const files = (await fs.readdir(uploadsDir)).sort().reverse();
  res.render("index", { files });
});

app.post("/upload", upload.single("image"), (_req, res) => {
  res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
