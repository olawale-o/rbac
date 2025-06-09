class RoleMap {
  constructor(role) {
    this.role = role;
  }

  static toDTO(role) {
    return {
      id: role.id,
      name: role.name,
    };
  }
}

module.exports = RoleMap;
