const db = require("../../../models");
const authDAO = require("./dao/dao");
const { Repository } = require("../../../core/repository/repository.core");

class AuthRepository extends Repository {
  constructor() {
    super(db.sequelize, db.User);
  }

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
