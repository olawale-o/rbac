const db = require("../../../models");
const authDAO = require("./dao/dao");
const { Repository } = require("../../../core/repository/repository.core");
const {
  NotFoundException,
} = require("../../../libraries/exception/exceptions");
const { InvalidEmailCredentialsException } = require("../domain/auth.error");

class AuthRepository extends Repository {
  constructor() {
    super(db.sequelize, db.User);
  }

  async findByEmail({ email }) {
    try {
      const user = await authDAO.findByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new InvalidEmailCredentialsException(error);
      }
      throw new Error(error);
    }
  }
}
module.exports = { AuthRepository };
