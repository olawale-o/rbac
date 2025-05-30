const UserRepository = require("../repository/repository");
const userRoleRepository = require("../repository/user-role.repository");
const userGroupRepository = require("../repository/user-group.repository");
const roleRepository = require("../../roles/repository/repository");
const groupRepository = require("../../groups/repository/repository");
const AppError = require("../../../libraries/error/src");
const { User } = require("../domain/user.entity");
const { Role } = require("../domain/value-objects/role.value-object");
const { Group } = require("../domain/value-objects/group.value-object");
const db = require("../../../models");

const createNewUser = async ({ roles, groups, user }) => {
  const userRepository = new UserRepository();
  try {
    const roleIds = await roleRepository.findAllRoleByIds(roles);

    if (!roleIds || roleIds.length !== roles.length) {
      throw new AppError(422, "Provide valid role ids");
    }

    const groupIds = await groupRepository.findAllGroupByIds(groups);

    if (!groupIds || groupIds.length !== groups.length) {
      throw new AppError(422, "Provide valid group ids");
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
    throw new AppError(500, error.message);
  }
};

module.exports = {
  createNewUser,
};
