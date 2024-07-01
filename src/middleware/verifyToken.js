const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../lib/user");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    const user = await findUserByEmail(decoded.email);
    if (user) {
      req.user = user;
    } else {
      return res.status(401).send({ message: "unauthorized access" });
    }
    next();
  });
};

module.exports = verifyToken;
