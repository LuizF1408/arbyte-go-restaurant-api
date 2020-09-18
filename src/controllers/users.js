const service = require("../services/users");
const handleError = require("./handleError");

const login = async (req, res) => {
  try {
    if (!req.body.cpf || !req.body.password) {
      throw { status: 400, message: "Invalid data" };
    }
    const data = await service.login(req.body);
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
};

const forgotPassword = (req, res) => {
  try {
    service.forgotPassword(req.body);
    res.status(204).end();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  login,
  forgotPassword,
};
