class RoleMap {
  constructor(role) {
    this.role = role;
  }

  static toDTO(role) {
    return {
      id: role.id,
      name: role.name,
      // userRolePermissionId: role.user_role_permission.id,
      // permissions: role.user_role_permission.Permissions.map((permission) =>
      //   PermissionMap.toDTO(permission),
      // ),
    };
  }
}

module.exports = RoleMap;
