const handleError = require("./handleError");
const service = require("../services/meals");

const getAll = async (req, res) => {
  try {
    const meals = await service.getAll();
    res.json(meals);
  } catch (e) {
    handleError(res, e);
  }
};

module.exports = {
  getAll,
};
