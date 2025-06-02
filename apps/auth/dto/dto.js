const RoleMap = require("./role.dto");
const GroupMap = require("./group.dto");
const PermissionMap = require("./permission.dto");

class UserMap {
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
  static toDomain(user) {
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

  toJWT(model) {
    const jwtData = {
      id: model.id,
      email: model.email,
      permissions: model.permissions,
    };
    return jwtData;
  }
}
module.exports = UserMap;
