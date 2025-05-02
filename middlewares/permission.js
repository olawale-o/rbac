const groupAccess = (groupPermissionType, groups) => {
  const inGroup = groups.find((group) => {
    return group.user_group_permission.find(
      (permission) => permission.type === groupPermissionType,
    );
  });
  if (inGroup) {
    return true;
  }
  return false;
};

const checkPermission = (type) => {
  return async (req, res, next) => {
    const { user } = req.cookies;
    const groupCanAccess = groupAccess(type, user.groups);
    if (groupCanAccess) {
      return next();
    }
    const userRoles = user ? user.roles : [];

    isPermissionFound = userRoles.find((role) => {
      return role.user_role_permission.Permissions.find(
        (permission) => permission.type === type,
      );
    });
    if (isPermissionFound) {
      return next();
    }
    return res
      .status(403)
      .json({ error: "Access denied. You dont have enough permission" });
  };
};

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

module.exports = { checkPermission, isAuthorized };
