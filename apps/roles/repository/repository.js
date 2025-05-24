const roleDAO = require("./dao/dao");

const findRoleById = async (id) => {
  try {
    const role = await roleDAO.findRoleById(id);
    return role;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

module.exports = {
  findRoleById,
};
