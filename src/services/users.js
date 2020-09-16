const User = require("../models/User");
const { encryptPassword } = require("./utils/encrypt");
const repository = require("../repositories/users");
const { createToken } = require("./utils/jwt");

const login = async (loginData) => {
  const user = await repository.getOne({ cpf: loginData.cpf });
  if (!user) {
    throw { status: 401, message: "Not authorized" };
  }
  const { encryptedPassword } = encryptPassword(loginData.password, user.salt);
  if (encryptedPassword !== user.password) {
    throw { status: 401, message: "Not authorized" };
  }
  const token = createToken(user.id);
  return {
    user: user.view(),
    token,
  };
};

const getById = async (id) => {
  const user = await repository.getOne({ id: id });
  if (!user.id) {
    throw { status: 404, message: "Not found" };
  }
  return user;
};

module.exports = {
  login,
  getById,
};
