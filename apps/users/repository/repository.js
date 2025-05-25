const userDAO = require("./dao/dao");

save = async (user) => {
  try {
    const response = await userDAO.save(user);
    return response;
  } catch (error) {
    throw new Error("Failed to save user");
  }
};

module.exports = {
  save,
};
