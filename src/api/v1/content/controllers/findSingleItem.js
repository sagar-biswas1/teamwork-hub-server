const { findById } = require("../../../../lib/content");

/**
 * Fetch a single content item by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @example
 * app.get('/content/:id', findContentById);
 */
const findContentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch content from the database by ID
    const content = await findById(id);

    // Check if content exists
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Return the content
    res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
