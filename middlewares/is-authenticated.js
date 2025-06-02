const { verifyToken } = require("../libraries/jwt/src");
const { ForbiddenException } = require("../libraries/exception/exceptions");

const isAuthenticated = async (req, res, next) => {
  if (!req.cookies) {
    throw new ForbiddenException("Cookies are required");
  }

  if (!req.cookies.accessToken) {
    throw new ForbiddenException("Cookies are required");
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
