const authDAO = require("./dao/dao");

class AuthRepository extends Repository {
  async authenticateByEmail({ email }) {
    try {
      const user = await authDAO.findByEmail(email);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = { AuthRepository };
