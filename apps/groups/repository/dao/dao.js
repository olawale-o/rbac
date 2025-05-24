const db = require("../../../../models");

const findGroupById = async (id) => {
  try {
    const group = await db.Group.findByPk(id);
    return group;
  } catch (error) {
    throw new Error(`Failed to find role with id ${id}: ${error.message}`);
  }
};

const findAll = async (query) => {
  try {
    const groups = await db.Group.findAll(query);
    return groups;
  } catch (error) {
    throw new Error(`Failed to find all groups: ${error.message}`);
  }
};

module.exports = {
  findGroupById,
  findAll,
};
