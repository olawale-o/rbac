class Role {
  constructor(id, name) {
    this.name = name;
  }
}

class Permission {}

class User {
  constructor(id, email, roles = [], permissions = []) {
    this.id = id;
    this.email = email;
    this.roles = roles;
    this.permissions = permissions;
  }
}

module.exports = User;
