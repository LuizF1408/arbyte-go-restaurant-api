const repository = require("../repositories/meals");

const getAll = () => repository.getAll();

module.exports = {
  getAll,
};
