const userRoleDAO = require("./dao/user-role.dao");

save = async (userId, roleId) => {
  try {
    const response = await userRoleDAO.save(userId, roleId);
    return response;
  } catch (error) {
    throw new Error("Failed to save user role");
  }
};

bulkSave = async (userId, roleIds) => {
  try {
    const response = await userRoleDAO.bulkSave(userId, roleIds);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to save user roles");
  }
};

module.exports = {
  save,
  bulkSave,
};
