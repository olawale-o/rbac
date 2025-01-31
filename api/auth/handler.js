const db = require("../../models");
const { comparePassword } = require("../../utils/bcrypt");
const { signToken } = require("../../utils/jwt");

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24;

const generateJWTToken = (data, key, expires) => signToken(data, key, expires);

const generateAccessToken = (data) =>
  generateJWTToken(data, "ACCESS_TOKEN", ACCESS_TOKEN_EXPIRATION);

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({
        where: { email },
        include: [
          {
            model: db.Role,
            as: "my_roles",
            attributes: ["id", "name"],
            through: { attributes: [] },
            include: [
              {
                model: db.UserRole,
                as: "user_role_permission",
                attributes: ["id"],

                include: [
                  {
                    model: db.Permission,
                    attributes: ["id", "type"],
                    through: { attributes: [] },
                  },
                ],
              },
            ],
          },
          {
            model: db.Group,
            as: "my_groups",
            attributes: ["id", "name"],
            through: { attributes: [] },
            include: [
              {
                as: "user_group_permission",
                model: db.Permission,
                attributes: ["id", "type"],
                through: { attributes: [] },
              },
            ],
          },
        ],
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const data = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roles: user.my_roles,
        groups: user.my_groups,
      };

      res.cookie("user", data);

      const accessToken = generateAccessToken({ id: user.id });
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

      return res.status(200).json({
        data,
      });
    } catch (e) {
      next(e);
    }
  },
};
