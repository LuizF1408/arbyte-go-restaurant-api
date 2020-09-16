const tableUsers = "users";

exports.up = function (knex) {
  return knex.schema.createTable(tableUsers, (table) => {
    table.increments();
    table.string("cpf", 11).notNull().unique();
    table.string("name").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.string("salt").notNull();
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableUsers);
};
