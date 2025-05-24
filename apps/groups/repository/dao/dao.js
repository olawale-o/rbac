const db = require("../../../../models");

const findGroupById = async (id) => {
  try {
    const group = await db.Group.findByPk(id);
    return group;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

module.exports = {
  findGroupById,
};
