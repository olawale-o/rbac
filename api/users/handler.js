const db = require("../../models");
const { hashPassword } = require("../../utils/bcrypt");
module.exports = {
  new: async (req, res, next) => {
    try {
      const body = req.body;
      const user = {
        fullName: body.fullName,
        password: await hashPassword(body.password),
        email: body.email,
      };
      const roles = body.roles;
      const groups = body.groups;

      if (!Array.isArray(roles) && !Array.isArray(groups)) {
        throw new Error("Kindly provide arrays of roles or groups");
      }

      if (roles.length < 1 || groups.length < 1) {
        throw new Error("Kindly assign atleast a group and role to user");
      }

      const newUser = await db.User.create(user, { w: 1 }, { returning: true });
      if (!newUser) {
        throw new Error("Bad Request");
      }

      roles.forEach((role) => {
        const roleExist = db.Role.findByPk(role.id);
        if (!roleExist) {
          throw new Error("Unable to assign role to user");
        }

        db.UserRole.create({
          userId: newUser.id,
          roleId: role.id,
        });
      });
      groups.forEach((group) => {
        const groupExist = db.Group.findByPk(group.id);
        if (!groupExist) {
          throw new Error("Unable to assign group to user");
        }

        db.UserGroup.create({
          userId: newUser.id,
          groupId: group.id,
        });
      });

      return res.status(200).json({ message: "User created" });
    } catch (e) {
      next(e);
    }
  },

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

      const destroyed = await db.UserRole.destroy({
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

      roles.forEach((role) => {
        const roleExist = db.Role.findByPk(parseInt(role.id));
        if (!roleExist) {
          throw new Error("Kindly provide a valid role id");
        }

        data.push({ roleId: role.id, userId: parseInt(id, 10) });
      });

      const saved = await db.UserRole.bulkCreate(data);

      return res.status(200).json({ messsage: "Role assigned" });
    } catch (e) {
      next(e);
    }
  },
};
