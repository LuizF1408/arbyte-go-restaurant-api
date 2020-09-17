const { Router } = require("express");
const router = new Router();
const controller = require("../controllers/meals");
const authenticate = require("./middlewares/authenticate");

const routeName = "/meals";

router.get(routeName, controller.getAll);
router.post(routeName, authenticate, controller.create);
router.delete(`${routeName}/:id`, authenticate, controller.del);

module.exports = router;
