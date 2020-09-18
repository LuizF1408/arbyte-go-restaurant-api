const User = require("../models/User");
const { encryptPassword, generatePassword } = require("./utils/encrypt");
const repository = require("../repositories/users");
const { createToken } = require("./utils/jwt");
const encrypt = require("./utils/encrypt");

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

const forgotPassword = async ({ cpf }) => {
  const { id, salt } = await repository.getOne({ cpf });
  if (!id) {
    return;
  }
  const newPassword = generatePassword();

  const { encryptedPassword: password } = encryptPassword(newPassword, salt);
  await repository.update(id, {
    password,
    updated_at: new Date().toUTCString(),
  });
  //TODO send email with the new password
};

const changePassword = async (id, { password, newPassword }) => {
  const user = await repository.getOne({ id });
  if (!user.id) {
    throw { status: 404, message: "Not found" };
  }
  const { encryptedPassword } = encryptPassword(password, user.salt);
  if (encryptedPassword !== user.password) {
    throw { status: 409, message: "Current password no matching" };
  }
  const { encryptedPassword: newPasswordEncrypted } = encryptPassword(
    newPassword,
    user.salt
  );
  return repository.update(id, {
    password: newPasswordEncrypted,
    updated_at: new Date().toUTCString(),
  });
};

module.exports = {
  login,
  getById,
  forgotPassword,
  changePassword,
};
