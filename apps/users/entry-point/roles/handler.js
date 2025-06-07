const db = require("../../../../models");
const { Op } = require("sequelize");
const UserRepository = require("../../repository/repository");
const { User } = require("../../domain/user.entity");
const {
  NotFoundException,
} = require("../../../../libraries/exception/exceptions");
module.exports = {
  update: async (req, res, next) => {
    const userRepo = new UserRepository();

    try {
      const id = req.params.id;
      const { roles, revoke } = req.body;
      if (!Array.isArray(roles) || roles.length < 1) {
        throw new Error("Kindly provide arrays of roles");
      }
      const isFound = await userRepo.findUserByIdWithFullDetails(
        Number.parseInt(id),
      );

      if (!isFound) {
        throw new NotFoundException("Kindly provide valid user id");
      }

      const user = new User({
        id: isFound.id,
        props: {
          fullName: isFound.fullName,
          email: isFound.email,
          roles: isFound.roles.map((role) => role.name),
          groups: isFound.groups.map((group) => group.name),
        },
      });

      const rolesIdArray = roles.map((role) => Number.parseInt(role.id));

      const rolesFound = await db.Role.findAll({
        where: {
          id: {
            [Op.in]: rolesIdArray,
          },
        },
      });

      if (rolesFound.length !== roles.length) {
        throw new NotFoundException("Kindly provide a valid role id(s)");
      }

      user.assignRoles(rolesFound.map((role) => role.name));

      if (revoke === true) {
        user.revokedRoles(rolesFound);
        await db.UserRole.destroy({
          where: {
            userId: Number.parseInt(id, 10),
            roleId: {
              [Op.in]: rolesIdArray,
            },
          },
        });
        return res.status(200).json({ messsage: "Role revoked" });
      }
      await db.UserRole.bulkCreate(
        rolesFound.map((role) => ({
          userId: Number.parseInt(id, 10),
          roleId: role.id,
        })),
      );

      return res.status(200).json({ messsage: "Role assigned" });
    } catch (e) {
      next(e);
    }
  },
};
