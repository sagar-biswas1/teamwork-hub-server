const { deleteById,findById } = require("../../../../lib/content");

/**
 * Delete a content item by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @example
 * app.delete('/project/content/:id', deleteContentById);
 */
const deleteContentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if content exists
    if (!(await findById(id))) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Delete content from the database by ID
    await deleteById(id);

    // Return success message
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteContentById;
