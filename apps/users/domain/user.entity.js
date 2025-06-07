const { Entity } = require("../../../core/domain/entity.core");
const {
  NotFoundException,
} = require("../../../libraries/exception/exceptions");

class User extends Entity {
  constructor({ id, props }) {
    super({ id, props });
    this._id = id || null;
  }

  static create(userProps) {
    const id = null;
    const props = { ...userProps };
    return new User({ id, props });
  }

  roles() {
    return this.props.roles;
  }

  groups() {
    return this.props.groups;
  }

  assignRoles(newRoles) {
    if (!Array.isArray(newRoles) && newRoles.length > 0) {
      throw new Error("Roles must be an array");
    }

    const roles = [...this.props.roles, ...newRoles];

    this.props.roles = roles;
  }

  revokeRoles(roles) {
    if (!Array.isArray(roles) && roles.length > 0) {
      throw new Error("Roles must be an array");
    }

    const rolesFound = this.props.roles.filter((role) => roles.includes(role));

    if (rolesFound.length !== roles.length) {
      throw new NotFoundException("Kindly provide a valid role id(s)");
    }

    const rolesLeft = this.props.roles.filter((role) => !roles.includes(role));

    this.props.roles = rolesLeft;
  }

  assignGroups(newGroups) {
    if (!Array.isArray(newGroups)) {
      throw new Error("Groups must be an array");
    }

    if (newGroups.length > 2) {
      throw new Error("User can have at most two groups");
    }

    const groups = [...this.props.roles, ...newGroups];
    this.props.groups = groups;
  }

  validate() {
    if (this.props.roles.length === 0) {
      throw new Error("User must have at least one role");
    }
    if (this.props.groups.length === 0) {
      throw new Error("User must be part of at least one group");
    }
  }
}

module.exports = { User };
