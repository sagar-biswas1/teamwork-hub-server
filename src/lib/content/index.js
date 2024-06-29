const { default: mongoose } = require("mongoose");
const defaults = require("../../config/defaults");
const Content = require("../../model/Content");
/**
 * Creates a new content in the database.
 *
 * @param {object} contentData - content data to be saved.
 * @returns {Promise<object>} A Promise that resolves to the created content object.
 */
const createContent = async (userData) => {
  const newContent = new Content(userData);
  await newContent.save();
  return newContent._doc;
};

/**
 * Fetch all content with pagination and populated createdBy field.
 *
 * @param {Object} options - Options for pagination.
 * @param {number} [options.page=defaults.page] - The page number to fetch.
 * @param {number} [options.limit=defaults.limit] - The number of items per page.
 * @returns {Promise<Array>} - A promise that resolves to an array of content objects.
 *
 * @throws {Error} - Throws an error if there is an issue with fetching content.
 *
 * @example
 * const contents = await findAll({ page: 1, limit: 10 });
 * console.log(contents);
 */
const findAll = async ({ page = defaults.page, limit = defaults.limit }) => {
  try {
    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    // Fetch content from the database with pagination and populate the createdBy field
    const contents = await Content.find({})
      .populate({ path: "createdBy", select: "name" })
      .skip(skip)
      .limit(limit);
    // Get the total count of content
    const totalContents = await Content.countDocuments({});
    const totalPages = Math.ceil(totalContents / limit);

    return {
      contents: contents.map((content) => ({ ...content._doc })),
      totalContents,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    throw new Error("Error fetching content");
  }
};

/**
 * Fetch a single content item by its ID.
 *
 * @param {string} id - The ID of the content to fetch.
 * @returns {Promise<Object|null>} - A promise that resolves to the content object if found, or null if not found.
 * @throws {Error} - Throws an error if there is an issue with fetching content.
 *
 * @example
 * const content = await findById('60d21b4667d0d8992e610c85');
 * if (content) {
 *   console.log(content);
 * } else {
 *   console.log('Content not found');
 * }
 */

const findById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }
    // Fetch content from the database by ID and populate createdBy and collaborators fields
    const content = await Content.findById(id)
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "collaborators", select: "name" });
    return content ? content._doc : null;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a content item by its ID.
 *
 * @param {string} id - The ID of the content to delete.
 * @returns {Promise<Object>} - A promise that resolves to a success message.
 * @throws {Error} - Throws an error if there is an issue with deleting content.
 *
 * @example
 * const result = await deleteById('60d21b4667d0d8992e610c85');
 * console.log(result.message); // 'Content deleted successfully'
 */
const deleteById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }

    // Delete content from the database by ID
    await Content.findByIdAndDelete(id);
    return { message: "Content deleted successfully" };
  } catch (error) {
    throw error;
  }
};

/**
 * Update a content item by its ID.
 *
 * @param {string} id - The ID of the content to update.
 * @param {Object} contentData - The updated content data (title, body, collaborators).
 * @returns {Promise<Object|null>} - A promise that resolves to the updated content object if successful, or null if not found.
 * @throws {Error} - Throws an error if there is an issue with updating content.
 *
 * @example
 * const updatedContent = await updateById('60d21b4667d0d8992e610c85', {
 *   title: 'Updated Title',
 *   body: 'Updated Body',
 *   collaborators: ['60d21b4667d0d8992e610c86', '60d21b4667d0d8992e610c87']
 * });
 * console.log(updatedContent);
 */
const updateById = async (id, contentData) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid content ID format");
    }

    // Destructure contentData
    const { title, body, collaborators } = contentData;

    const updateDoc = { title, body };
    // Handle collaborators array
    if (collaborators && collaborators.length > 0) {
      updateDoc.$addToSet = {
        collaborators: { $each: collaborators },
      };
    }
    // Update content in the database by ID
    const updatedContent = await Content.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true,
    });

    // Return the updated content or null if not found
    return updatedContent;
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};

module.exports = { createContent, findAll, findById, deleteById, updateById };
