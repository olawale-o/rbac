const { Op } = require("sequelize");
const AppError = require("../../../libraries/error/src");
const userRepository = require("../repository/repository");
const userRoleRepository = require("../repository/user-role.repository");
const userGroupRepository = require("../repository/user-group.repository");
const roleRepository = require("../../roles/repository/repository");
const groupRepository = require("../../groups/repository/repository");

const { hashPassword } = require("../../../libraries/bcrypt/src");

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

      // move this to validation
      if (!Array.isArray(roles) && !Array.isArray(groups)) {
        throw new AppError(422, "Kindly provide arrays of roles or groups");
      }

      if (roles.length < 1 || groups.length < 1) {
        throw new AppError(
          422,
          "Kindly assign atleast a group and role to user",
        );
      }
      // end validation

      const rolesToFind = roles.map((role) => role.id);
      const groupsToFind = groups.map((group) => group.id);

      const roleIds = await roleRepository.findAllRoleByIds(rolesToFind);

      if (!roleIds || roleIds.length !== rolesToFind.length) {
        throw new AppError(422, "Provide valid role ids");
      }

      const groupIds = await groupRepository.findAllGroup(groupsToFind);

      if (!groupIds || groupIds.length !== groupsToFind.length) {
        throw new AppError(422, "Provide valid group ids");
      }

      // save user with its roles and groups
      const newUser = await userRepository.save(user);
      if (!newUser) {
        throw new AppError(500, "Internal Server Error");
      }

      await userRoleRepository.bulkSave(
        newUser.id,
        roles.map((role) => role.id),
      );

      await userGroupRepository.bulkSave(
        newUser.id,
        groups.map((group) => group.id),
      );

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
