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
