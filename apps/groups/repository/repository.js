const groupDAO = require("./dao/dao");

const findGroupById = async (id) => {
  try {
    const group = await groupDAO.findGroupById(id);
    return group;
  } catch (error) {
    throw new Error(`Failed to find group with id ${id}: ${error.message}`);
  }
};

const findAllGroup = async (query) => {
  try {
    const groups = await groupDAO.findAll(query);
    return groups;
  } catch (error) {
    throw new Error(`Failed to find role all ${error.message}`);
  }
};

module.exports = {
  findGroupById,
  findAllGroup,
};
