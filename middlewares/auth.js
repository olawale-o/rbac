const { verifyToken } = require("../utils/jwt");

const isAuthenticated = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new Error("Access token is required");
  }

  try {
    const data = verifyToken(accessToken, "ACCESS_TOKEN");
    if (!data) {
      throw new Error("Token verification failed 1");
    }
    req.data = data;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { isAuthenticated };
