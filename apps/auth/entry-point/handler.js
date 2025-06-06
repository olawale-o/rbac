const { AuthRepository } = require("../repositiory/repository");
const { comparePassword } = require("../../../libraries/bcrypt/src");
const { generateAccessToken } = require("../../../utils/jwt");
const { AuthMapper } = require("./auth.mapper");
const {
  InvalidEmailCredentialsException,
  AuthException,
  InvalidPasswordException,
} = require("../domain/auth.error");

module.exports = {
  login: async (req, res, next) => {
    const authRepository = new AuthRepository();
    const authMapper = new AuthMapper();
    try {
      const { email, password } = req.body;

      const user = await authRepository.findByEmail({ email });

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new InvalidPasswordException("Invalid email or password");
      }

      const jwtData = authMapper.toJWT(user);

      const accessToken = generateAccessToken(jwtData);
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

      return res.status(200).json({
        message: "Login successful",
        ...authMapper.toResponse({ accessToken, refreshToken: accessToken }),
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
