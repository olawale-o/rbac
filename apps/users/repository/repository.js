const db = require("../../../models");
const { Repository } = require("../../../core/repository/repository.core");

class UserRepository extends Repository {
  constructor() {
    super(db.sequelize, db.User);
  }

  async save(transaction, props) {
    const user = await db.User.create(props.user, { transaction });
    await db.UserRole.bulkCreate(
      props.roles.map((role) => ({ userId: user.id, roleId: role.id() })),
      { transaction },
    );
    await db.UserGroup.bulkCreate(
      props.groups.map((group) => ({ userId: user.id, groupId: group.id() })),
      { transaction },
    );
    return user;
  }
}

module.exports = UserRepository;
