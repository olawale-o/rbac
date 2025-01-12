const checkGroup = (groupName) => {
  return async (req, res, next) => {
    const { user } = req.cookies;
    const userGroups = user ? user.groups : "anonymous";
    const inGroup = userGroups.find((group) => group.name === groupName);
    if (inGroup) {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  };
};

module.exports = { checkGroup };
