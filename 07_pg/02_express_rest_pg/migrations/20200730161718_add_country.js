exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("country", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("country");
  });
};
