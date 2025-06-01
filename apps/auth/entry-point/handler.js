const { AuthRepository } = require("../repositiory/repository");
const { comparePassword } = require("../../../libraries/bcrypt/src");
const { signToken } = require("../../../libraries/jwt/src");
const UserMap = require("../dto/dto");
const {
  InvalidEmailCredentialsException,
  AuthException,
  InvalidPasswordException,
} = require("../domain/auth.error");

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24;

const generateJWTToken = (data, key, expires) => signToken(data, key, expires);

const generateAccessToken = (data) =>
  generateJWTToken(data, "ACCESS_TOKEN", ACCESS_TOKEN_EXPIRATION);

module.exports = {
  login: async (req, res, next) => {
    const authRepository = new AuthRepository();
    try {
      const { email, password } = req.body;

      const user = await authRepository.findByEmail({ email });

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new InvalidPasswordException("Invalid email or password");
      }
      const cookieData = UserMap.toCookie(user);
      res.cookie("user", cookieData);

      const accessToken = generateAccessToken({ id: user.id });
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

      return res.status(200).json({
        data: UserMap.toDTO(user),
      });
    } catch (e) {
      if (
        e instanceof InvalidEmailCredentialsException ||
        e instanceof InvalidPasswordException
      ) {
        next(new AuthException(e));
      }
      next(e);
    }
  },
};
