const { findAll: findAllContent } = require("../../../../lib/content");
/**
 * This function handles the GET request to '/content' endpoint.
 * It retrieves all content documents from the database and sends them as a response.
 *
 * @param {Request} req - The request object containing the HTTP request details.
 * @param {Response} res - The response object to send HTTP response.
 * @param  next - The next function to call the next middleware.
 * @returns {void}
 */
const findAll = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    // Fetch all content documents from the database
    const contentList = await findAllContent({ page, limit });
    // Send a 200 OK status with the content list as JSON
    res.status(200).json(contentList);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error status with an error message
    next(error);
  }
};

module.exports = findAll;
