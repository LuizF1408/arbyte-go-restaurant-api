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

const del = async (userId, id) => {
  const meal = await repository.getById(id);
  if (!meal.id) {
    throw { status: 404, message: "Not Found" };
  }
  return repository.del(id);
};

module.exports = {
  getAll,
  create,
  del,
};
