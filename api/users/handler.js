const AppError = require("../../libraries/error/src");
const db = require("../../models");
const { hashPassword } = require("../../libraries/bcrypt/src");
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
        throw new AppError(422, "Kindly provide arrays of roles or groups");
      }

      if (roles.length < 1 || groups.length < 1) {
        throw new AppError(
          422,
          "Kindly assign atleast a group and role to user",
        );
      }

      const newUser = await db.User.create(user, { w: 1 }, { returning: true });
      if (!newUser) {
        throw new AppError(422, "Bad Request");
      }

      for (const role of roles) {
        const roleExist = await db.Role.findByPk(role.id);
        if (!roleExist) {
          throw new AppError(400, "Unable to assign role to user");
        }

        db.UserRole.create({
          userId: newUser.id,
          roleId: role.id,
        });
      }

      for (const group of groups) {
        const groupExist = await db.Group.findByPk(group.id);
        if (!groupExist) {
          throw new AppError(400, "Unable to assign group to user");
        }

        db.UserGroup.create({
          userId: newUser.id,
          groupId: group.id,
        });
      }

      return res.status(200).json({ message: "User created" });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        next(new Error("This email already exist"));
      } else {
        next(e);
      }
    }
  },
};
