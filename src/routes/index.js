const router = require("express").Router();

const { controllers: authControllers } = require("../api/v1/authentication");
const { controllers: contentontrollers } = require("../api/v1/content");

router.route("/api/v1/auth/register").post(authControllers.registration);
router.route("/api/v1/auth/login").post(authControllers.login);

module.exports = router;
