const userDAO = require("./dao/dao");

save = async (user) => {
  try {
    const response = await userDAO.save(user);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  save,
};
