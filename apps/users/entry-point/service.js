const UserRepository = require("../repository/repository");
const roleRepository = require("../../roles/repository/repository");
const groupRepository = require("../../groups/repository/repository");
const { User } = require("../domain/user.entity");
const { Role } = require("../domain/value-objects/role.value-object");
const { Group } = require("../domain/value-objects/group.value-object");
const {
  UnprocessedEntityException,
  InternalServerErrorException,
  NotFoundException,
} = require("../../../libraries/exception/exceptions");
const { UserMapper } = require("./user.mapper");

const createNewUser = async ({ roles, groups, user }) => {
  const userRepository = new UserRepository();
  try {
    const roleIds = await roleRepository.findAllRoleByIds(roles);

    if (!roleIds || roleIds.length !== roles.length) {
      throw new UnprocessedEntityException("Provide valid role ids");
    }

    const groupIds = await groupRepository.findAllGroupByIds(groups);

    if (!groupIds || groupIds.length !== groups.length) {
      throw new UnprocessedEntityException("Provide valid group ids");
    }

    const u = User.create({
      email: user.email,
      fullName: user.fullName,
      password: user.password,
      roles: roleIds.map(
        (role) => new Role({ id: role.id, props: { name: role.name } }),
      ),
      groups: groupIds.map(
        (group) => new Group({ id: group.id, props: { name: group.name } }),
      ),
    });

    await userRepository.transaction(
      async (transaction) =>
        await userRepository.save(transaction, {
          user: {
            email: u.props.email,
            fullName: u.props.fullName,
            password: u.props.password,
          },
          roles: u.roles(),
          groups: u.groups(),
        }),
    );
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
};

const findUser = async (id) => {
  const userRepository = new UserRepository();
  // const userMapper = new UserMapper();
  try {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
};

module.exports = {
  createNewUser,
  findUser,
};
