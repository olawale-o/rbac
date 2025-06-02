const { verifyToken } = require("../libraries/jwt/src");
const { ForbiddenException } = require("../libraries/exception/exceptions");

const isAuthenticated = async (req, res, next) => {
  if (!request.cookies?.accessToken) {
    throw new ForbiddenException("Access token is required");
  }
  const { accessToken } = req.cookies;

  try {
    const data = verifyToken(accessToken, "ACCESS_TOKEN");
    if (!data) {
      throw new ForbiddenException("Access token is required");
    }
    req.data = data;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { isAuthenticated };
