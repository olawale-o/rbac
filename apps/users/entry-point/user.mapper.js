const { Mapper } = require("../../../core/domain/mapper.core");
const { User } = require("../domain/user.entity");
class UserMapper extends Mapper {
  toPersistence(entity) {
    return {
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(record) {
    const entity = new User({
      id: record.id || null,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: record.email,
        fullName: record.fullName,
        roles: record.roles.map((role) => role.name),
        groups: record.groups.map((group) => group.name),
      },
    });

    return entity;
  }

  toResponse(entity) {
    return {
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

module.exports = { UserMapper };
