const { findById } = require("../../../../lib/feedback");

/**
 * Fetch a single feedback item by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @example
 * app.get('/content/feedback/:id', findFeedbackById);
 */
const findFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch content from the database by ID
    const feedback = await findById(id);

    // Check if content exists
    if (!feedback) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Return the content
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = findFeedbackById;
