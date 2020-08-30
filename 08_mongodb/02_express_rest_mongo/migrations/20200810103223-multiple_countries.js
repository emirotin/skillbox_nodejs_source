module.exports = {
  async up(db, _client) {
    await db.collection("users").updateMany(
      {
        country: { $exists: true },
      },
      [
        {
          $set: { country: ["$country"] },
        },
      ]
    );

    await db.collection("users").updateMany(
      {
        country: { $exists: false },
      },
      [
        {
          $set: { country: [] },
        },
      ]
    );
  },

  async down(db, _client) {
    await db.collection("users").updateMany(
      {
        country: { $exists: true },
      },
      [
        {
          $set: { country: { $arrayElemAt: ["$country", -1] } },
        },
      ]
    );
  },
};
