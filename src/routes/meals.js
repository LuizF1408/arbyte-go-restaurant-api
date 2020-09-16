const { Router } = require("express");
const router = new Router();
const controller = require("../controllers/meals");

const routeName = "/meals";

router.get(routeName, controller.getAll);

module.exports = router;
