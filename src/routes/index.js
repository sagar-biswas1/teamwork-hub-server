const router = require("express").Router();

const { controllers: authControllers } = require("../api/v1/authentication");

router.route("/api/v1/auth/register").post(authControllers.registration);

router.route("/api/v1/auth/login").post(authControllers.login);

module.exports = router;
