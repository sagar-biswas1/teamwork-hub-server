const defaults = require("../../config/defaults");
const { default: mongoose } = require("mongoose");
const Feedback = require("../../model/Feedback");
/**
 * Creates a new feedback in the database.
 *
 * @param {object} feedbackData - The feedback data to be saved.
 * @returns {Promise<object>} A Promise that resolves to the created feedback object.
 * @throws {Error} Throws an error if saving the feedback fails.
 */
const createFeedBack = async (feedbackData) => {
  try {
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    return newFeedback._doc;
  } catch (error) {
    console.error("Error creating feedback:", error);
    throw new Error("Failed to create feedback");
  }
};

/**
 * Update a feedback item by its ID.
 *
 * @param {string} id - The ID of the feedback to update.
 * @param {Object} feedbackData - The updated feedback data (feedbackText).
 * @returns {Promise<Object|null>} - A promise that resolves to the updated content object if successful, or null if not found.
 * @throws {Error} - Throws an error if there is an issue with updating content.
 *
 * @example
 * const updatedFeedback = await updateById('60d21b4667d0d8992e610c85', {
 
 *   feedbackText: 'Updated feedbackText'
 * });
 * console.log(updatedContent);
 */
const updateById = async (id, feedbackData) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    // Destructure contentData
    const { feedbackText } = feedbackData;

    const updateDoc = { feedbackText };

    // Update content in the database by ID
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true,
    });
    console.log({ updatedFeedback });
    // Return the updated content or null if not found
    return updatedFeedback;
  } catch (error) {
    console.error("Error updating content:", error);
    throw error;
  }
};

/**
 * Delete a feedback item by its ID.
 *
 * @param {string} id - The ID of the feedback to delete.
 * @returns {Promise<Object>} - A promise that resolves to a success message.
 * @throws {Error} - Throws an error if there is an issue with deleting feedback.
 *
 * @example
 * const result = await deleteById('60d21b4667d0d8992e610c85');
 * console.log(result.message); // 'feedback deleted successfully'
 */
const deleteById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }

    // Delete content from the database by ID
    await Feedback.findByIdAndDelete(id);
    return { message: "Content deleted successfully" };
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch a feedback item by its ID.
 *
 * @param {string} id - The ID of the feedback to fetch.
 * @returns {Promise<Object|null>} - A promise that resolves to the content object if found, or null if not found.
 * @throws {Error} - Throws an error if there is an issue with fetching content.
 *
 * @example
 * const feedback = await findById('60d21b4667d0d8992e610c85');
 * if (feedback) {
 *   console.log(feedback);
 * } else {
 *   console.log('feedback not found');
 * }
 */

const findById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid feedback ID format" });
    }
    // Fetch content from the database by ID and populate createdBy and collaborators fields
    const feedback = await Feedback.findById(id).populate({
      path: "user",
      select: "name",
    });

    return feedback ? feedback._doc : null;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch feedback for a specific content with pagination and populated user field.
 *
 * @param {string} contentId - The ID of the content to fetch feedback for.
 * @param {Object} options - Options for pagination.
 * @param {number} [options.page=defaults.page] - The page number to fetch.
 * @param {number} [options.limit=defaults.limit] - The number of items per page.
 * @returns {Promise<Object>} - A promise that resolves to an object containing feedback, total feedback count, total pages, and current page.
 *
 * @throws {Error} - Throws an error if there is an issue with fetching feedback.
 *
 * @example
 * const feedbackData = await findFeedbacksByContentID('contentId', { page: 1, limit: 10 });
 * console.log(feedbackData);
 */
const findFeedbacksByContentID = async (
  contentId,
  { page = defaults.page, limit = defaults.limit }
) => {
  try {
    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;
console.log({skip: skip, limit: limit})
    // Fetch feedback from the database with pagination and populate the user field
    const feedback = await Feedback.find({ content: contentId })
      .populate({ path: "user", select: "name" })
      .skip(skip)
      .limit(limit);

    // Get the total count of feedback for the content
    const totalFeedback = await Feedback.countDocuments({ content: contentId });
    const totalPages = Math.ceil(totalFeedback / limit);

    // Return feedback along with pagination details
    return {
      feedback: feedback.map((fb) => ({ ...fb._doc })),
      totalFeedback,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw new Error("Error fetching feedback");
  }
};
module.exports = {
  createFeedBack,
  updateById,
  deleteById,
  findById,
  findFeedbacksByContentID,
};
