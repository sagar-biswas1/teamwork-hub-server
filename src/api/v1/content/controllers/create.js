const { createContent } = require("../../../../lib/content");
const { contentCreationSchema } = require("../validationSchema");

/**
 * Handles the creation of new content.
 *
 * @param {Request}  req - The request object containing content data.
 * @param  {Response} - The response object for sending a response.
 * @param  next - The next function to call the next middleware.
 * @returns {Promise<void>} A Promise that resolves once the content is created.
 */
const create = async (req, res, next) => {
  try {
    // Extract content data from request body
    const contentObj = { title: req.body.title, createdBy: req.body.createdBy };

    // Validate content data against schema
    const parsedBody = contentCreationSchema.safeParse(contentObj);
    if (!parsedBody.success) {
      return res.status(400).json({ errors: parsedBody.error.errors });
    }

    // Create new content using the createContent function
    const content = await createContent({
      ...parsedBody.data,
    });

    
    return res.status(201).json(content);
  } catch (err) {
    console.error("Error creating content:", err);
    next(err);
  }
};

module.exports = create;
