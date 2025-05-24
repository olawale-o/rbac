const userGroupDAO = require("./dao/user-group.dao");

save = async (userId, groupId) => {
  try {
    const response = await userGroupDAO.save(userId, groupId);
    return response;
  } catch (error) {
    throw new Error("Failed to save user role");
  }
};

bulkSave = async (userId, groupIds) => {
  try {
    const response = await userGroupDAO.bulkSave(userId, groupIds);
    return response;
  } catch (error) {
    throw new Error("Failed to save user roles");
  }
};

module.exports = {
  save,
  bulkSave,
};
