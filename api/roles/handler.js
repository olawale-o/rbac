const db = require("../../models");
const { Op } = require("sequelize");
module.exports = {
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { roles, revoke } = req.body;
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

      if (revoke === true) {
        await db.UserRole.destroy({
          where: {
            userId: parseInt(id, 10),
            roleId: {
              [Op.in]: rolesIdArray,
            },
          },
        });
        return res.status(200).json({ messsage: "Role revoked" });
      }
      const saved = await db.UserRole.bulkCreate(data);

      return res.status(200).json({ messsage: "Role assigned" });
    } catch (e) {
      next(e);
    }
  },
};
