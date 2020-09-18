const { Router } = require("express");
const router = new Router();
const controller = require("../controllers/users");
const authenticate = require("./middlewares/authenticate");

const routeName = "/users";

router.post(`${routeName}/login`, controller.login);
router.patch(`${routeName}/forgot-password`, controller.forgotPassword);
router.patch(
  `${routeName}/change-password`,
  authenticate,
  controller.changePassword
);

module.exports = router;
