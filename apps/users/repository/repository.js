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

  async findUserById(id) {
    const user = await db.User.findOne({
      where: { id },
      include: [
        {
          model: db.Role,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              model: db.UserRole,
              as: "user_role_permission",
              attributes: ["id"],

              include: [
                {
                  model: db.Permission,
                  attributes: ["id", "type"],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
        {
          model: db.Group,
          as: "groups",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              as: "user_group_permission",
              model: db.Permission,
              attributes: ["id", "type"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}

module.exports = UserRepository;
