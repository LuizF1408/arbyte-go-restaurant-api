const knex = require("../../database");
const Meal = require("../models/Meal");
const tableName = "meals";

/*
SELECT * FROM meals
*/
const getAll = async () => {
  const meals = await knex(tableName);
  return meals.map((meal) => new Meal(meal));
};

const create = async (meal) => {
  const [created] = await knex(tableName).insert(meal).returning("*");
  return new Meal(created);
};

module.exports = {
  getAll,
  create,
};
