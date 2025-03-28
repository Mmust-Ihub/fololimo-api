export const paginate = (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;

  const skip = (page - 1) * limit;

  req.pagination = { page, limit, skip };
  next();
};

