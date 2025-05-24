const db = require("../../../../models");

const save = async (userId, roleId) => {
  try {
    const response = await db.UserRole.create({
      userId,
      roleId,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const bulkSave = async (userId, roleIds) => {
  try {
    const response = await db.UserRole.bulkCreate(
      roleIds.map((roleId) => ({ userId, roleId })),
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  save,
  bulkSave,
};
