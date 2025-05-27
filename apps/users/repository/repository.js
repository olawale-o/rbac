const { Repository } = require("../../../core/repository/repository.core");
const userDAO = require("./dao/dao");

class UserRepository extends Repository {
  async save(user) {
    try {
      const response = await userDAO.save(user);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserRepository;
