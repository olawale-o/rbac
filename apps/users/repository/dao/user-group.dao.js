const db = require("../../../../models");

const save = async (userId, groupId) => {
  try {
    const response = await db.UserGroup.create({
      userId,
      groupId,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const bulkSave = async (userId, groupIds) => {
  try {
    const response = await db.UserGroup.bulkCreate(
      groupIds.map((groupId) => ({ userId, groupId })),
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
