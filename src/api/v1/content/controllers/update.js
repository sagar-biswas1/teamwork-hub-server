const { updateById } = require("../../../../lib/content");
const { updateContentSchema } = require("../validationSchema");

/**
 * Update a content item by its ID.
 *
 * @param {Object} req - Express request object containing updated content data.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @example
 * app.put('/content/:id', updateContentById);
 */
const updateContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, collaborators } = req.body;
    // Validate content data against schema
    const parsedBody = updateContentSchema.safeParse({
      title,
      body,
      collaborators,
    });
    if (!parsedBody.success) {
      return res.status(400).json({ errors: parsedBody.error.errors });
    }

    // Update content in the database by ID
    const updatedContent = await updateById(id, parsedBody.data);

    if(!updatedContent){
      return res.status(404).json({ "message": "Document not found" });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = updateContentById;