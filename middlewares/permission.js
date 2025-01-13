const checkPermission = (type) => {
  return async (req, res, next) => {
    const permissions = req.permissions;
    const inPermission = permissions.find(
      (permission) => permission.type === type,
    );
    if (inPermission) {
      return next();
    } else {
      return res
        .status(403)
        .json({ error: "Access denied. You dont have the permission" });
    }
  };
};

module.exports = { checkPermission };
