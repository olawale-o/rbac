const RoleMap = require("./role.dto");
const GroupMap = require("./group.dto");
const PermissionMap = require("./permission.dto");

class UserMap {
  constructor(user) {
    this.user = user;
  }

  static toDTO(user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles.map((role) => RoleMap.toDTO(role)),
      groups: user.groups.map((group) => GroupMap.toDTO(group)),
      permissions: [
        user.roles.map((role) =>
          role.user_role_permission.Permissions.map(
            (permission) => PermissionMap.toDTO(permission).type,
          ),
        ),
        user.groups.map((group) =>
          group.user_group_permission.map(
            (permission) => PermissionMap.toDTO(permission).type,
          ),
        ),
      ].flat(2),
    };
  }

  static toCookie(user) {
    const data = UserMap.toDTO(user);

    const cookieData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      permissions: data.permissions,
      roles: data.roles,
    };
    return cookieData;
  }
}
module.exports = UserMap;
