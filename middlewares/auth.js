const AppError = require("../libraries/error/src");
const { verifyToken } = require("../libraries/jwt/src");

const isAuthenticated = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new AppError(403, "Access token is required");
  }

  try {
    const data = verifyToken(accessToken, "ACCESS_TOKEN");
    if (!data) {
      throw new AppError(403, "Access token is required");
    }
    req.data = data;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { isAuthenticated };
