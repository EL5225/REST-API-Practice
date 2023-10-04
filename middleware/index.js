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

export const getPagination = (req, count, limit, page, filter) => {
  const pagination = {};
  const link = {};
  const path = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;

  if (count - limit * page <= 0) {
    link.next = "";

    if (page - 1 <= 0) {
      link.prev = "";
    } else {
      link.prev = `${path}?page=${page - 1}&limit=${limit}&filter=${filter}`;
    }
  } else {
    link.next = `${path}?page=${page + 1}&limit=${limit}&filter=${filter}`;

    if (page - 1 <= 0) {
      link.prev = "";
    } else {
      link.prev = `${path}?page=${page - 1}&limit=${limit}&filter=${filter}`;
    }
  }

  pagination.links = link;
  pagination.totalItems = count;

  return pagination;
};
