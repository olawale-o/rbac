const db = require("../../models");
const { comparePassword } = require("../../utils/bcrypt");
const { signToken } = require("../../utils/jwt");
const grpc = require("@grpc/grpc-js");

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24;

const generateJWTToken = (data, key, expires) => signToken(data, key, expires);

const generateAccessToken = (data) =>
  generateJWTToken(data, "ACCESS_TOKEN", ACCESS_TOKEN_EXPIRATION);

module.exports = {
  login: async (call, callback) => {
    try {
      const { email, password } = call.request;
      const meta = new grpc.Metadata();

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
        return callback({
          message: "Invalid email or password",
          code: grpc.status.INVALID_ARGUMENT,
          status: "error",
        });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return callback({
          message: "Invalid email or password",
          staus: "error",
          code: grpc.status.INVALID_ARGUMENT,
        });
      }

      const data = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roles: user.my_roles,
        groups: user.my_groups,
      };
      // res.cookie("user", data);

      const accessToken = generateAccessToken({ id: user.id });
      // res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
      return callback(null, { token: accessToken });
    } catch (e) {
      return callback({
        message: "Internal server error",
        code: grpc.status.INTERNAL,
        status: "error",
      });
    }
  },
};
