const encrypt = require("../src/services/utils/encrypt");

const tableUsers = 'users';
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      const now = new Date().toUTCString();
      const { salt, encryptedPassword: password } = encrypt.encryptPassword(
        "123456"
      );
      return knex("users").insert([
        {
          id: 1,
          cpf: "95909141287",
          salt,
          name: "Douglas Soares",
          email: "sdouglas5107@gmail.com",
          password,
          created_at : now,
          updated_at : now
        },
      ]);
    });
};
