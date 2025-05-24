const groupDAO = require("./dao/dao");

const findGroupById = async (id) => {
  try {
    const group = await groupDAO.findGroupById(id);
    return group;
  } catch (error) {
    throw new Error(`Failed to find group with id ${id}: ${error.message}`);
  }
};

module.exports = {
  findGroupById,
};
