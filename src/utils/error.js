/**
 * Creates a new Error object representing a resource not found (HTTP 404) error.
 *
 * @param {string} message - Optional. The error message to be included. Defaults to "Resource not found".
 * @returns {Error} - An Error object with a status property set to 404.
 */
const notFound = (message = "Resource not found") => {
  const error = new Error(message);

  error.status = 404;

  return error;
};

/**
 * Creates a new Error object representing a bad request (HTTP 400) error.
 *
 * @param {string} message - Optional. The error message to be included. Defaults to "Expected resources have not been provided".
 * @returns {Error} - An Error object with a status property set to 400.
 */
const badRequest = (message = "Expected resources have not been provided") => {
  const error = new Error(message);

  error.status = 400;

  return error;
};


/**
 * Creates a new Error object representing an internal server error (HTTP 500).
 *
 * @param {string} message - Optional. The error message to be included. Defaults to "Internal Server Error".
 * @returns {Error} - An Error object with a status property set to 500.
 */
const internalServerError = (message = "Internal Server Error") => {
    const error = new Error(message);
    error.status = 500;
    return error;
}


/**
 * Creates a new Error object representing a validation error (HTTP 422).
 *
 * @param {string} message - Optional. The error message to be included. Defaults to "Validation Error".
 * @returns {Error} - An Error object with a status property set to 422.
 */
const validationError = (message = "Validation Error") => {
    const error = new Error(message);
    error.status = 422;
    return error;
}



module.exports = {
  notFound,
  badRequest,
  internalServerError,
  validationError
};
