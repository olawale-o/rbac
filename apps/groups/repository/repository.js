const groupDAO = require("./dao/dao");

const findGroupById = async (id) => {
  try {
    const group = await groupDAO.findGroupById(id);
    return group;
  } catch (error) {
    throw new Error(`Failed to find group with id ${id}: ${error.message}`);
  }
};

const findAllGroupByIds = async (groupIds) => {
  const query = {
    where: {
      id: {
        [Op.in]: groupsToFind,
      },
    },
  };
  try {
    const groups = await groupDAO.findAll(query);
    return groups;
  } catch (error) {
    throw new Error(`Failed to find all groups ${error.message}`);
  }
};

module.exports = {
  findGroupById,
  findAllGroupByIds,
};
