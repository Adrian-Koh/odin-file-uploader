function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    const error = new Error("You are not authenticated to view this page.");
    error.status = 401;
    next(error);
  }
}

module.exports = { isAuthenticated };
