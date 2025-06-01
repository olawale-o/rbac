const handleError = async (err, _req, res, _next) => {
  console.log("error handler");

  if (!err.isOperational) {
    console.error("Shutting down the application...");
    process.exit(1);
    // Shut down the application if it's not an AppError
  }
  return res.status(err.statusCode).json({
    err: err.toJSON(),
  });
};

module.exports = { ExceptionHandler: handleError };
