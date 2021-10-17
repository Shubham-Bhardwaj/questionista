const isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res
        .status(400)
        .type("application/json")
        .json({ message: "Please login to perform this action" });
  }
  next();
};

module.exports = { isAuth };
