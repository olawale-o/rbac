const authDAO = require("./dao/dao");
const authenticateByEmail = async ({ email }) => {
  try {
    const user = await authDAO.findByEmail(email);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  authenticateByEmail,
};
