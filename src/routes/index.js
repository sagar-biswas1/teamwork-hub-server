const router = require("express").Router();

const { controllers: authControllers } = require("../api/v1/authentication");
const { controllers: contentControllers } = require("../api/v1/content");
const { controllers: feedbackControllers } = require("../api/v1/feedback");
const verifyToken = require("../middleware/verifyToken");

// routing for authentication module
router.route("/api/v1/auth/register").post(authControllers.registration);
router.route("/api/v1/auth/login").post(authControllers.login);
router.route("/api/v1/auth/verify-token").post(authControllers.verifyToken);

//routing for content module
router
  .route("/api/v1/projects/content")
  .post(verifyToken, contentControllers.create)
  .get(verifyToken, contentControllers.findAll);

router
  .route("/api/v1/projects/content/:id")
  .get(verifyToken, contentControllers.findByID)
  .patch(verifyToken, contentControllers.updateByID)
  .delete(verifyToken, contentControllers.removeContentByID);

//routing for feedbacks
router
  .route("/api/v1/content/feedback")
  .get(verifyToken, feedbackControllers.findFeedbacksContentId);

router
  .route("/api/v1/content/feedback/:id")
  .post(verifyToken, feedbackControllers.create)
  .get(verifyToken, feedbackControllers.findByID)
  .patch(verifyToken, feedbackControllers.updateByID)
  .delete(verifyToken, feedbackControllers.removeFeedbackByID);

module.exports = router;
