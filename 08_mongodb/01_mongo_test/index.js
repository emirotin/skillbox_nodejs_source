require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URI, {
  useUnifiedTopology: true,
});

(async () => {
  try {
    await client.connect();

    const db = client.db("users");

    const name = process.argv[2];

    const res = await db
      .collection("users")
      .find({
        name,
      })
      .toArray();

    console.log(res);
  } catch (err) {
    console.error(err);
  }

  await client.close();
})();
