const db = require("../../../../models");

const findRoleById = async (id) => {
  try {
    const role = await db.Role.findByPk(id);
    return role;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

module.exports = {
  findRoleById,
};
