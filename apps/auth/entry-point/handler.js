const repository = require("../repositiory/repository");
const { comparePassword } = require("../../../libraries/bcrypt/src");
const { signToken } = require("../../../libraries/jwt/src");
const UserMap = require("../dto/dto");
const AppError = require("../../../libraries/error/src");

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24;

const generateJWTToken = (data, key, expires) => signToken(data, key, expires);

const generateAccessToken = (data) =>
  generateJWTToken(data, "ACCESS_TOKEN", ACCESS_TOKEN_EXPIRATION);

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await repository.authenticateByEmail({ email });
      if (!user) {
        throw new AppError(400, "Invalid email or password");
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new AppError(400, "Invalid email or password");
      }
      const cookieData = UserMap.toCookie(user);
      res.cookie("user", cookieData);

      const accessToken = generateAccessToken({ id: user.id });
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

      return res.status(200).json({
        data: UserMap.toDTO(user),
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
};
