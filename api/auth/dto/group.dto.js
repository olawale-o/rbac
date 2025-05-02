const PermissionMap = require("./permission.dto");

class GroupMap {
  constructor(group) {
    this.group = group;
  }

  static toDTO(group) {
    return {
      id: group.id,
      name: group.name,
      userGroupPermissionId: group.user_group_permission.id,
      permissions: group.user_group_permission.map((permission) =>
        PermissionMap.toDTO(permission),
      ),
    };
  }
}

module.exports = GroupMap;
