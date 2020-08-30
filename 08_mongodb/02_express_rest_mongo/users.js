const express = require("express");
const pick = require("lodash/pick");

const { MongoClient, ObjectId } = require("mongodb");

const clientPromise = MongoClient.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  poolSize: 10,
});

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db("users");
    next();
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await req.db.collection("users").find(req.query).toArray();
    res.json(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await req.db.collection("users").findOne({ _id: ObjectId(id) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send(`Unknown user ID: ${id}`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = pick(req.body, "name", "age", "country");

    const { insertedId } = await req.db.collection("users").insertOne(data);

    res.header("Location", `${req.protocol}://${req.hostname}/api/users/${insertedId}`).sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = pick(req.body, "name", "age", "country");
    const { modifiedCount } = await req.db.collection("users").updateOne({ _id: ObjectId(id) }, { $set: data });
    if (modifiedCount === 0) {
      res.status(404).send(`Unknown user ID: ${id}`);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { deletedCount } = await req.db.collection("users").deleteOne({ _id: ObjectId(id) });
    if (deletedCount === 0) {
      res.status(404).send(`Unknown user ID: ${id}`);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
