const RoleMap = require("./role.dto");
const GroupMap = require("./group.dto");

class UserMap {
  constructor(user) {
    this.user = user;
  }

  static toDTO(user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.my_roles.map((role) => RoleMap.toDTO(role)),
      groups: user.my_groups.map((group) => GroupMap.toDTO(group)),
    };
  }
}
module.exports = UserMap;
