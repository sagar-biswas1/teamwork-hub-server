const { createUser } = require("../../../../lib/authentication");
const { UserCreateSchema } = require("../zodSchema");
const bcrypt = require("bcryptjs");
const { findUserByEmail } = require("../../../../lib/user");

/**
 * Handles user registration.
 *
 * @param  req - The request object containing user data.
 * @param  res - The response object for sending a response.
 * @param  next - The next function to call the next middleware.
 * @returns {Promise<void>} A Promise that resolves once user registration is completed.
 */
const userRegistration = async (req, res, next) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // Validate user input against schema
    const parsedBody = UserCreateSchema.safeParse({
      name,
      email,
      password,
      role: "USER",
      status: "ACTIVE",
      verified: true, // TODO: Update after implementing email verification
    });

    if (!parsedBody.success) {
      return res.status(400).json({ errors: parsedBody.error.errors });
    }

    // Check if the user already exists
    const existingUser = await findUserByEmail(parsedBody?.data?.email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

    // Create a new User instance
    const newUser = await createUser({
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: hashedPassword,
      role: parsedBody.data.role,
      status: parsedBody.data.status,
      verified: parsedBody.data.verified,
    });

    // Respond with success message and user data
    return res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    next(error);
  }
};

module.exports = userRegistration;
