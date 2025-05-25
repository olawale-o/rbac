const { Op } = require("sequelize");
const roleDAO = require("./dao/dao");

const findRoleById = async (id) => {
  try {
    const role = await roleDAO.findRoleById(id);
    return role;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

const findAllRoleByIds = async (roleIds) => {
  const query = {
    where: {
      id: {
        [Op.in]: roleIds,
      },
    },
  };
  try {
    const roles = await roleDAO.findAll(query);
    return roles;
  } catch (error) {
    throw new Error(`Failed to find all roles ${error.message}`);
  }
};

module.exports = {
  findRoleById,
  findAllRoleByIds,
};
