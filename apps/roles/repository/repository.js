const roleDAO = require("./dao/dao");

const findRoleById = async (id) => {
  try {
    const role = await roleDAO.findRoleById(id);
    return role;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

const findAllRole = async (query) => {
  try {
    const roles = await roleDAO.findAll(query);
    return roles;
  } catch (error) {
    throw new Error(`Failed to find role all ${error.message}`);
  }
};

module.exports = {
  findRoleById,
  findAllRole,
};
