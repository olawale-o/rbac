const UserRoleService = require("../../../user_role/service");

module.exports = {
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!Array.isArray(req.body.roles) || req.body.roles.length < 1) {
        throw new Error("Kindly provide arrays of roles");
      }

      const message = await UserRoleService.updateUserRole({
        userId: id,
        body: req.body,
      });
      return res.status(200).json({ message });
    } catch (e) {
      next(e);
    }
  },
};
