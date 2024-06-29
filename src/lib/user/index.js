const User = require("../../model/User");

/**
 * Finds a user by their email.
 *
 * @param {string} email - The email of the user to find.
 * @returns {Promise<object|null>} A Promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If there's an error while querying the database.
 */
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? user._doc : null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
};
