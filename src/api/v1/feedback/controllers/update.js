const { updateById } = require("../../../../lib/feedback");

/**
 * Update feedback.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedbackText } = req.body;

    if (!feedbackText || feedbackText === "") {
      return res.status(404).json({ message: "Feedback not found" });
    }
    const updatedFeedback = await updateById(id, { feedbackText });
    res.status(200).json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(400).json({ message: "Error updating feedback", error });
  }
};


module.exports = updateFeedbackById;