const knex = require("../../database");
const User = require("../models/User");
const { sendEMail: sendMail } = require("./utils/mail");
const tableName = "users";

/*
SELECT * FROM users WHERE id=?
*/
const getOne = async (filter) => {
  const [user] = await knex(tableName).where(filter);
  return new User(user);
};

const update = async (id, user) => {
  const [updated] = await knex(tableName)
    .where({ id })
    .update(user)
    .returning("*");
  return new User(updated);
};

const sendEMail = async (msg) => sendMail(msg);

module.exports = {
  getOne,
  update,
  sendEMail,
};
