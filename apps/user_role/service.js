const UserRepository = require("../users/repository/repository");

const { User } = require("../users/domain/user.entity");
const { NotFoundException } = require("../../libraries/exception/exceptions");
const { UserRoleRepository } = require("./repository/repository");
const RoleRepository = require("../roles/repository/repository");

const updateUserRole = async ({ userId, body: { roles, revoke } }) => {
  try {
    const userRepo = new UserRepository();
    const userRoleRepo = new UserRoleRepository();

    const userFound = await userRepo.findUserByIdWithFullDetails(
      Number.parseInt(userId),
    );

    const user = new User({
      id: userFound.id,
      props: {
        fullName: userFound.fullName,
        email: userFound.email,
        roles: userFound.roles.map((role) => role.name),
        groups: userFound.groups.map((group) => group.name),
      },
    });

    const rolesIdArray = roles.map((role) => Number.parseInt(role.id));

    const rolesFound = await RoleRepository.findAllRoleByIds(rolesIdArray);

    if (rolesFound.length !== roles.length) {
      throw new NotFoundException("Kindly provide a valid role id(s)");
    }

    if (revoke === true) {
      user.revokeRoles(rolesFound.map((role) => role.name));
      await userRoleRepo.destroy(userId, rolesIdArray);
      return "Role revoked";
    }

    user.assignRoles(rolesFound.map((role) => role.name));

    await userRoleRepo.save(
      rolesFound.map((role) => ({
        userId: Number.parseInt(userId, 10),
        roleId: role.id,
      })),
    );

    return "Role assigned";
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw error;
  }
};

module.exports = {
  updateUserRole,
};
