const tableMeals = "meals";

exports.up = function (knex) {
  return knex.schema.createTable(tableMeals, (table) => {
    table.increments();
    table.string("image_url").notNull();
    table.string("name").notNull();
    table.float("price").notNull().unique();
    table.string("description").notNull();
    table.boolean("available").notNull();
    table.integer("created_by").notNull().references("users");
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableMeals);
};
