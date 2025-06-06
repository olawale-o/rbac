const { Entity } = require("../../../core/domain/entity.core");

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
