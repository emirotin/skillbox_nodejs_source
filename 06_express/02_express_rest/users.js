const express = require("express");
const pick = require("lodash/pick");

const db = require("./db");

const router = express.Router();

router.get("/", async (req, res) => {
  await db.createCollection("users");
  const users = await db.find("users", req.query);
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.createCollection("users");
    const user = await db.get("users", id);
    res.json(user);
  } catch (err) {
    if (err.code === db.NO_ENTITY) {
      res.status(404).send(`Unknown user ID: ${id}`);
      return;
    }
    throw err;
  }
});

router.post("/", async (req, res) => {
  await db.createCollection("users");
  const id = await db.create("users", pick(req.body, "name", "country", "age"));
  res.header("Location", `${req.protocol}://${req.hostname}/api/users/${id}`).sendStatus(201);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.createCollection("users");
    const updateData = pick(req.body, "name", "country", "age");
    await db.update("users", id, updateData);
    res.sendStatus(204);
  } catch (err) {
    if (err.code === db.NO_ENTITY) {
      res.status(404).send(`Unknown user ID: ${id}`);
      return;
    }
    throw err;
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.createCollection("users");
    await db.delete("users", id);
    res.sendStatus(204);
  } catch (err) {
    if (err.code === db.NO_ENTITY) {
      res.status(404).send(`Unknown user ID: ${id}`);
      return;
    }
    throw err;
  }
});

module.exports = router;
