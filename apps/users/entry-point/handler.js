const AppError = require("../../../libraries/error/src");

const userService = require("./service");
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

      await userService.createNewUser(rolesToFind, groupsToFind, user);

      return res.status(200).json({ message: "User created" });
    } catch (e) {
      console.error(e);
      if (e.name === "SequelizeUniqueConstraintError") {
        next(new Error("This email already exist"));
      } else {
        next(e);
      }
    }
  },
};
