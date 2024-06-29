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

module.exports = { createContent };
