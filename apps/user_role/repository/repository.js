const { Op } = require("sequelize");
const { Repository } = require("../../../core/repository/repository.core");
const db = require("../../../models");

class UserRoleRepository extends Repository {
  constructor() {
    super(db.sequelize, db.UserRole);
  }

  async save(userRoles) {
    await db.UserRole.bulkCreate(userRoles);
  }

  async destroy(userId, userRoleIds) {
    await db.UserRole.destroy({
      where: {
        userId: Number.parseInt(userId, 10),
        roleId: {
          [Op.in]: userRoleIds,
        },
      },
    });
  }
}

module.exports = { UserRoleRepository };
