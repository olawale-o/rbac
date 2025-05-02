const isAuthorized = (permission) => {
  return async (req, res, next) => {
    const { user } = req.cookies;
    const isPermissionFound = user.permissions.indexOf(permission) !== -1;
    if (isPermissionFound) {
      return next();
    }
    return res
      .status(403)
      .json({ error: "Access denied. You dont have enough permission" });
  };
};

module.exports = { isAuthorized };
