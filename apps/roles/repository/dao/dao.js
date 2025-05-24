const db = require("../../../../models");

const findRoleById = async (id) => {
  try {
    const role = await db.Role.findByPk(id);
    return role;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

const findAll = async (query) => {
  try {
    const roles = await db.Role.findAll(query);
    return roles;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to find all roles: ${error.message}`);
  }
};

module.exports = {
  findRoleById,
  findAll,
};
