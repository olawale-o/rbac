const userDAO = require("../dao/dao");
const authenticateByEmail = async ({ email }) => {
  try {
    const user = await userDAO.findByEmail(email);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  authenticateByEmail,
};
