const { Mapper } = "../../../core/domain/mapper";
class AuthMapper extends Mapper {
  toResponse({ accessToken, refreshToken }) {
    return {
      accessToken,
      refreshToken,
    };
  }
}
