function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const stationName = req.query.station; // Station name filter

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const query = {}; // Initialize empty query object

    // Add station name filter to the query if provided
    if (stationName) {
      query.stationName = stationName;
    }

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find(query)
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = {
  paginatedResults,
};
