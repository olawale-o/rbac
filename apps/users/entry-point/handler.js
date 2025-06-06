const {
  UnprocessedEntityException,
} = require("../../../libraries/exception/exceptions");

const userService = require("./service");
const { hashPassword } = require("../../../libraries/bcrypt/src");
const { ResponseCore } = require("../../../core/api/response.core");

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
        throw new UnprocessedEntityException(
          "Kindly provide arrays of roles or groups",
        );
      }

      if (body.roles.length < 1 || body.groups.length < 1) {
        throw new UnprocessedEntityException(
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
  show: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.findUser(userId);
      const data = {
        ...new ResponseCore(user),
        fullName: user.fullName,
        email: user.email,
        roles: user.roles.map((role) => role.name),
        groups: user.groups.map((group) => group.name),
      };
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
};
