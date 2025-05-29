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

      // move this to validation
      if (!Array.isArray(body.roles) || !Array.isArray(body.groups)) {
        throw new AppError(422, "Kindly provide arrays of roles or groups");
      }

      if (body.roles.length < 1 || body.groups.length < 1) {
        throw new AppError(
          422,
          "Kindly assign atleast a group and role to user",
        );
      }
      // end validation

      const roles = body.roles.map((role) => role.id);
      const groups = body.groups.map((group) => group.id);

      await userService.createNewUser({ roles, groups, user });

      return res.status(200).json({ message: "User created" });
    } catch (e) {
      next(e);
    }
  },
};
