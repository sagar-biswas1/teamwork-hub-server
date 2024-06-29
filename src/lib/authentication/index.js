const LoginHistory = require("../../model/LoginHistory");
const User = require("../../model/User");

/**
 * Generates a 5-digit verification code.
 * The code is derived from the current timestamp and a random 2-digit number.
 *
 * @returns {string} A 5-digit verification code.
 */

const generateVerificationCode = () => {
  // Get current timestamp in milliseconds
  const timestamp = new Date().getTime().toString();

  // Generate a random 2-digit number
  const randomNum = Math.floor(10 + Math.random() * 90);

  // Combine timestamp and random number and extract last 5 digits
  let verificationCode = (timestamp + randomNum).slice(-5);

  return verificationCode;
};

/**
 * Creates a new user in the database.
 *
 * @param {object} userData - User data to be saved.
 * @returns {Promise<object>} A Promise that resolves to the created user object.
 */
const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();

  const savedUser = newUser._doc;
  delete savedUser.password;
  return savedUser;
};

/**
 * Creates a new login history record and saves it to the database.
 *
 * @param {object} info - Information related to the login history.
 * @param {string} info.userId - The ID of the user performing the login.
 * @param {Date} info.loginTime - The timestamp of the login.
 * @param {string} info.ipAddress - The IP address from which the login originated.
 * @returns {Promise<{ message: string, _id: string }>} A Promise resolving to an object with a success message and the ID of the saved login history record.
 * @throws {Error} If there's an error while saving the login history.
 */
const createLoginHistory = async (info) => {
  try {
    const loginHistory = new LoginHistory(info);

    await loginHistory.save();

    return {
      message: "Login history saved",
      _id: loginHistory._id,
    };
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = { generateVerificationCode, createUser,createLoginHistory };
