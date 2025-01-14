const checkRole = (roleName) => {
  return async (req, res, next) => {
    const { user } = req.cookies;
    const userRole = user ? user.roles : "anonymous";
    const inRole = userRole.find((role) => role.name === roleName);
    if (inRole) {
      return next();
    } else {
      return res
        .status(403)
        .json({ error: "Access denied, You dont have enough role" });
    }
  };
};

module.exports = { checkRole };
