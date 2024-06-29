const { createFeedBack: addFeedback } = require("../../../../lib/feedback");
const { feedbackSchema } = require("../validationSchema");

/**
 * Add feedback to a document.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createFeedback = async (req, res) => {
  try {
    const feedbackObj = {
      feedbackText: req.body.feedbackText,
      content: req.params.id,
      user: req.body.user,
    };
    const parsedBody = feedbackSchema.safeParse(feedbackObj);
    if (!parsedBody.success) {
      return res.status(400).json({ errors: parsedBody.error.errors });
    }

    const newFeedback = await addFeedback(parsedBody.data);

    res
      .status(201)
      .json({ message: "Feedback added successfully", feedback: newFeedback });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(400).json({ message: "Error adding feedback", error });
  }
};

module.exports = createFeedback;
