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
  const { id, salt, email } = await repository.getOne({ cpf });
  if (!id) {
    return;
  }
  const newPassword = generatePassword(3);

  const { encryptedPassword: password } = encryptPassword(newPassword, salt);
  await repository.update(id, {
    password,
    updated_at: new Date().toUTCString(),
  });

  const msg = {
    to: email,
    subject: process.env.NEW_PASSWORD_SUBJECT,
    text: `Here is your new Password ${newPassword}`,
    html: `<strong>Here is your new Password ${newPassword}</strong>`,
  };

  return repository.sendEMail(msg);
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
