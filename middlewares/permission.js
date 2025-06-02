const { verifyToken } = require("../libraries/jwt/src");
const { UnauthorizedException } = require("../libraries/exception/exceptions");

const isAuthorized = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.cookies) {
        throw new UnauthorizedException("Cookies are required");
      }

      if (!req.cookies.accessToken) {
        throw new UnauthorizedException("Cookies are required");
      }

      const { accessToken } = req.cookies;
      const data = verifyToken(accessToken, "ACCESS_TOKEN");
      const isPermissionFound = data.permissions.indexOf(permission) !== -1;
      if (isPermissionFound) {
        return next();
      }
      throw new UnauthorizedException(
        "Access denied. You dont have enough permission",
      );
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { isAuthorized };
