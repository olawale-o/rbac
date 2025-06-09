class GroupMap {
  constructor(group) {
    this.group = group;
  }

  static toDTO(group) {
    return {
      id: group.id,
      name: group.name,
    };
  }
}

module.exports = GroupMap;
