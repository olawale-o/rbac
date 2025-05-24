const db = require("../../../../models");

const save = async (user) => {
  try {
    const response = await db.User.create(user, { w: 1 }, { returning: true });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  save,
};
