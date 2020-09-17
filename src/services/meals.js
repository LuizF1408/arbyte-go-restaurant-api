const repository = require("../repositories/meals");
const Meal = require("../models/Meal");

const getAll = () => repository.getAll();

const create = async (userId, mealData) => {
  const meal = new Meal({
    ...mealData,
    created_by: userId,
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
  });

  return repository.create(meal);
};

module.exports = {
  getAll,
  create,
};