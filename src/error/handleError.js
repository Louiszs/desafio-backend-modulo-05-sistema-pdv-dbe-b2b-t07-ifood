const HttpStatusError = require('./HttpStatusError');

const handleError = (response, error, statusCode) => {
  if (error instanceof HttpStatusError) {
    response.status(error.statusCode).json({ message: error.message });
  }
  else if (error instanceof Error) {
    response.status(statusCode).json({ message: error.message });
  } else {
    response.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleError;
