const db = require("../../../../models");

const save = async (user) => {
  try {
    const response = await db.User.create(user, { w: 1 }, { returning: true });
    return response;
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("email already exists");
    }
    throw new Error(error);
  }
};

module.exports = {
  save,
};
