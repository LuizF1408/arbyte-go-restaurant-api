const knex = require("../../database");
const User = require("../models/User");
const tableName = "users";

/*
SELECT * FROM users WHERE id=?
*/
const getOne = async (filter) => {
  const [user] = await knex(tableName).where(filter);
  return new User(user);
};

module.exports = {
  getOne,
};
