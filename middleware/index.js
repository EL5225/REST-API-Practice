export const notFound = (req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
  });
};

export const badRequest = (req, res, next) => {
  res.status(400).json({
    status: false,
    message: "Bad Request",
  });
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: `Internal Server Error`,
    detail: err.message,
  });
};
