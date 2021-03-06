exports.up = function (knex) {
  return knex.schema.createTable("user_countries", (table) => {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.string("country", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_countries");
};
