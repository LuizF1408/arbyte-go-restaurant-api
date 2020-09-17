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

const create = async (req, res) => {
  try {
    const { price, name, image_url, description } = req.body;
    if (!price || !name || !image_url || !description) {
      throw { status: 400, message: "Invalid Data" };
    }
    const created = await service.create(req.user.id, req.body);
    res.status(201).json(created);
  } catch (error) {
    handleError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const updated = await service.update(req.user.id, req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    handleError(res, error);
  }
};

const del = async (req, res) => {
  try {
    await service.del(req.user.id, req.params.id);
    res.status(204).end();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  del,
};
