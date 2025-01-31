const db = require("../../models");
module.exports = {
  revokeRole: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { roleId } = req.body;

      const isFound = await db.User.findByPk(parseInt(id));

      if (!isFound) {
        throw new Error("Kindly provide valid user id");
      }

      const roleExist = await db.Role.findByPk(parseInt(roleId));

      if (!roleExist) {
        throw new Error("Kindly provide valid user role id");
      }

      await db.UserRole.destroy({
        where: {
          roleId,
          userId: parseInt(id, 10),
        },
      });

      return res.status(200).json({ messsage: "Role revoked" });
    } catch (e) {
      next(e);
    }
  },
  assignRole: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { roles } = req.body;

      const data = [];

      if (!Array.isArray(roles) || roles.length < 1) {
        throw new Error("Kindly provide arrays of roles");
      }
      const isFound = await db.User.findByPk(parseInt(id));

      if (!isFound) {
        throw new Error("Kindly provide valid user id");
      }

      const rolesIdArray = roles.map((role) => {
        data.push({ roleId: role.id, userId: parseInt(id, 10) });
        return parseInt(role.id);
      });

      const rolesFound = await db.Role.findAll({ where: { id: rolesIdArray } });

      if (rolesFound.length !== roles.length) {
        throw new Error("Kindly provide a valid role id");
      }

      const saved = await db.UserRole.bulkCreate(data);

      return res.status(200).json({ messsage: "Role assigned" });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        next(new Error("A user cannot be assigned the same role"));
      } else {
        next(e);
      }
    }
  },
};
