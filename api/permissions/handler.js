const db = require("../../models");
const { hashPassword } = require("../../utils/bcrypt");
module.exports = {
  revokePermission: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { permissions } = req.body;
      if (!Array.isArray(permissions) || permissions.length < 1) {
        throw new Error("Kindly assign permissions to the user");
      }

      if (!Array.isArray(permissions) || permissions.length < 1) {
        throw new Error("Kindly assign permissions to the user");
      }

      const isFound = await db.User.findByPk(parseInt(id));

      if (!isFound) {
        throw new Error("Kindly provide valid user id");
      }

      permissions.forEach((permission) => {
        const permissionExist = db.RoleGroupPermission.findByPk(permission);
        if (!permissionExist) {
          throw new Error("Kindly provide valid permission id");
        }
      });

      await db.RoleGroupPermission.destroy({ where: { id: permissions } });

      res.status(200).json({ message: "Permission revoked for user" });
    } catch (e) {
      next(e);
    }
  },
  assignPermission: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { permissions } = req.body;
      const data = [];
      if (!Array.isArray(permissions) || permissions.length < 1) {
        throw new Error("Kindly assign permissions to the user");
      }

      const isFound = await db.User.findByPk(parseInt(id));

      if (!isFound) {
        throw new Error("Kindly provide valid user id");
      }

      permissions.forEach((permission) => {
        const permissionExist = db.Permission.findByPk(permission.id);
        if (!permissionExist) {
          throw new Error("Kindly provide valid permission id");
        }
        const userRoleExist = db.UserRole.findByPk(permission.roleId);
        if (!userRoleExist) {
          throw new Error("Kindly provide valid user role id");
        }

        data.push({
          permissionId: permission.id,
          permittableId: permission.roleId,
          permittableType: "role",
        });
      });

      await db.RoleGroupPermission.bulkCreate(data);

      res.status(200).json({ message: "Permission granted" });
    } catch (e) {
      next(e);
    }
  },
};
