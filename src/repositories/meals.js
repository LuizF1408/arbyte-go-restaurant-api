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

module.exports = {
  getAll,
};
