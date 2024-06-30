const router = require("express").Router();

const { controllers: authControllers } = require("../api/v1/authentication");
const { controllers: contentControllers } = require("../api/v1/content");
const { controllers: feedbackControllers } = require("../api/v1/feedback");

// routing for authentication module
router.route("/api/v1/auth/register").post(authControllers.registration);
router.route("/api/v1/auth/login").post(authControllers.login);
router.route("/api/v1/auth/verify-token").post(authControllers.verifyToken);

//routing for content module
router
  .route("/api/v1/projects/content")
  .post(contentControllers.create)
  .get(contentControllers.findAll);

router
  .route("/api/v1/projects/content/:id")
  .get(contentControllers.findByID)
  .patch(contentControllers.updateByID)
  .delete(contentControllers.removeContentByID);

//routing for feedbacks
router
  .route("/api/v1/content/feedback")
  .get(feedbackControllers.findFeedbacksContentId)
  
router
  .route("/api/v1/content/feedback/:id")
  .post(feedbackControllers.create)
  .get(feedbackControllers.findByID)
  .patch(feedbackControllers.updateByID)
  .delete(feedbackControllers.removeFeedbackByID);

module.exports = router;
