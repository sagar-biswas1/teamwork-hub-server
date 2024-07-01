const { findFeedbacksByContentID } = require("../../../../lib/feedback");
const config = require("../../../../config/defaults");
/**
 * Get feedback for a document.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFeedbacksByDocID = async (req, res) => {
  try {
    const { page=config.page, limit=config.limit, contentID } = req.query;
    if (!contentID) {
      return res.status(400).json({ message: "Content ID is required" });
    }
    const feedback = await findFeedbacksByContentID(contentID, {
      page: parseInt(page),
      limit: parseInt(limit),
    });

    return res.status(200).json(feedback);
  } catch (error) {
    console.error("Error getting feedback:", error);
    res.status(400).json({ message: "Error getting feedback", error });
  }
};

module.exports = getFeedbacksByDocID;
