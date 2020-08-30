require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const { nanoid } = require("nanoid");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");

const clientPromise = MongoClient.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  poolSize: 10,
});

app.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db("users");
    next();
  } catch (err) {
    next(err);
  }
});

const findUserByUsername = (db, username) => db.collection("users").findOne({ username });

const findUserBySessionId = async (db, sessionId) => {
  const session = await db.collection("sessions").findOne(
    { sessionId },
    {
      projection: { userId: 1 },
    }
  );

  if (!session) {
    return;
  }

  return db.collection("users").findOne({ _id: ObjectId(session.userId) });
};

const createSession = async (db, userId) => {
  const sessionId = nanoid();

  await db.collection("sessions").insertOne({
    userId,
    sessionId,
  });

  return sessionId;
};

const deleteSession = async (db, sessionId) => {
  await db.collection("sessions").deleteOne({ sessionId });
};

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.use(cookieParser());

const auth = () => async (req, res, next) => {
  if (!req.cookies["sessionId"]) {
    return next();
  }
  const user = await findUserBySessionId(req.db, req.cookies["sessionId"]);
  req.user = user;
  req.sessionId = req.cookies["sessionId"];
  next();
};

app.get("/", auth(), (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError === "true",
  });
});

app.post("/login", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(req.db, username);
  if (!user || user.password !== password) {
    return res.redirect("/?authError=true");
  }
  const sessionId = await createSession(req.db, user._id);
  res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/");
});

app.post("/api/add-book", auth(), async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const db = req.db;

  const response = await db.collection("users").findOneAndUpdate(
    {
      _id: ObjectId(req.user._id),
    },
    {
      $inc: { books: 1 },
    },
    { returnOriginal: false }
  );

  res.json({ books: response.value.books });
});

app.get("/logout", auth(), async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  await deleteSession(req.db, req.sessionId);
  res.clearCookie("sessionId").redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
