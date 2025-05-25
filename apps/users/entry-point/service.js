const userRepository = require("../repository/repository");
const userRoleRepository = require("../repository/user-role.repository");
const userGroupRepository = require("../repository/user-group.repository");
const roleRepository = require("../../roles/repository/repository");
const groupRepository = require("../../groups/repository/repository");
const AppError = require("../../../libraries/error/src");

const createNewUser = async (roles, groups, user) => {
  try {
    const roleIds = await roleRepository.findAllRoleByIds(roles);

    if (!roleIds || roleIds.length !== roles.length) {
      throw new AppError(422, "Provide valid role ids");
    }

    const groupIds = await groupRepository.findAllGroupByIds(groups);

    if (!groupIds || groupIds.length !== groups.length) {
      throw new AppError(422, "Provide valid group ids");
    }

    const newUser = await userRepository.save(user);
    if (!newUser) {
      throw new AppError(500, "Internal Server Error");
    }

    await userRoleRepository.bulkSave(
      newUser.id,
      roles.map((role) => role.id),
    );

    await userGroupRepository.bulkSave(
      newUser.id,
      groups.map((group) => group.id),
    );
  } catch (error) {
    throw new AppError(500, error.message);
  }
};

module.exports = {
  createNewUser,
};
