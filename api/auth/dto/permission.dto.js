class PermissionMap {
  constructor(user) {
    this.user = user;
  }

  static toDTO(permission) {
    return {
      id: permission.id,
      type: permission.type,
    };
  }
}

module.exports = PermissionMap;
