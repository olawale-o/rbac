const UserMap = require("../dto/dto");
const { Mapper } = require("../../../core/domain/mapper.core");

const userMapper = new UserMap();
class AuthMapper extends Mapper {
  toJWT(entity) {
    const userData = userMapper.toDomain(entity);
    return {
      id: userData.id,
      email: userData.email,
      permissions: userData.permissions,
    };
  }
  toResponse({ accessToken, refreshToken }) {
    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = {
  AuthMapper,
};
