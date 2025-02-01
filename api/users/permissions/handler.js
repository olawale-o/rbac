const db = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { permissions, revoke } = req.body;
      const data = [];
      let permissionsIdArray = [];
      if (!Array.isArray(permissions) || permissions.length < 1) {
        throw new Error("Kindly assign permissions to the user");
      }

      const isFound = await db.User.findByPk(parseInt(id));

      if (!isFound) {
        throw new Error("Kindly provide valid user id");
      }

      const userRolesIdArray = permissions.map((permission) => {
        permissionsIdArray = permission.id.map((p) => {
          data.push({
            permissionId: p,
            permittableId: permission.roleId,
            permittableType: "role",
          });

          return parseInt(p);
        });

        return parseInt(permission.roleId);
      });

      const permissionFound = await db.Permission.findAll({
        where: { id: permissionsIdArray },
      });
      const userRoleFound = await db.UserRole.findAll({
        where: { id: userRolesIdArray },
      });

      if (permissionFound.length !== permissionsIdArray.length) {
        throw new Error("Kindly provide a valid permission id");
      }
      if (userRoleFound.length !== permissions.length) {
        throw new Error("Kindly provide a valid role id");
      }

      if (revoke === true) {
        await db.RoleGroupPermission.destroy({
          where: {
            [Op.or]: data,
          },
        });

        return res.status(200).json({ message: "Permission revoked for user" });
      }
      await db.RoleGroupPermission.bulkCreate(data);

      return res.status(200).json({ message: "Permission granted" });
    } catch (e) {
      next(e);
    }
  },
};
