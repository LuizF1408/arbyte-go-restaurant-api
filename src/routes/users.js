const { Router } = require("express");
const router = new Router();
const controller = require("../controllers/users");

const routeName = "/users";

router.post(`${routeName}/login`, controller.login);
router.patch(`${routeName}/forgot-password`, controller.forgotPassword);

module.exports = router;
