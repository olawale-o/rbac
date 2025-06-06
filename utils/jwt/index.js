const { signToken } = require("../../libraries/jwt/src");
const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24;

const generateJWTToken = (data, key, expires) => signToken(data, key, expires);

const generateAccessToken = (data) =>
  generateJWTToken(data, "ACCESS_TOKEN", ACCESS_TOKEN_EXPIRATION);

const generateRefreshToken = (data) =>
  generateJWTToken(data, "REFRESH_TOKEN", ACCESS_TOKEN_EXPIRATION);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
