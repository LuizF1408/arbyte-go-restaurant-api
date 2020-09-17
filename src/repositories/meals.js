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

const getById = async (id) => {
  const [meal] = await knex(tableName).where({ id });
  return new Meal(meal);
};

const create = async (meal) => {
  const [created] = await knex(tableName).insert(meal).returning("*");
  return new Meal(created);
};

const del = (id) => knex(tableName).where({ id }).del();

module.exports = {
  getAll,
  getById,
  create,
  del,
};
