const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../../../../lib/user");
const { AccessTokenSchema } = require("../zodSchema");
const verifyToken = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const parsedToken = AccessTokenSchema.safeParse(accessToken);
    if (!parsedToken.success) {
      return res.status(400).json({ errors: parsedToken.error.errors });
    }
    // Perform token verification logic here (e.g., using JWT verification)
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await findUserByEmail(decoded.email);
    if (user) {
      delete user.password;
      return res
        .status(200)
        .json({ message: "successfully fetched the user", user });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
