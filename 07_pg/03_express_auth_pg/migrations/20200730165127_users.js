exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.integer("books").notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
