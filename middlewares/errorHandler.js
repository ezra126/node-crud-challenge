
const notFound = (err, req, res, next) => {
  if (err.statusCode == 404) {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    return res.status(404).json({ message: error.message });
  } else {
    next(err);
  }
};


const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode == 200 ? 400 : res.statusCode;
  res.status(statuscode);
  res.json({
    status: "error",
    message: err.message,
    errorType: err.name || "InternalServerError",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

module.exports = { errorHandler, notFound };