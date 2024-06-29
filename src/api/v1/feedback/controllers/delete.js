const { deleteById } = require("../../../../lib/feedback");

/**
 * Delete feedback.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteById(id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(400).json({ message: "Error deleting feedback", error });
  }
};


module.exports = deleteFeedback;