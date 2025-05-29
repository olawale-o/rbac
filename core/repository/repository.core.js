class Repository {
  constructor(sequelize, model) {
    this.sequelize = sequelize;
    this.model = model;
  }
  async save(data) {
    data.validate();
    // Implementation of saving data to the repository
    // await this.model.create(data);
  }
  async findBy(obj) {
    // Implementation of finding data by ID from the repository
  }

  async transaction(callback) {
    const transaction = await this.sequelize.transaction();
    try {
      await callback(transaction);
      await transaction.commit();
      console.log("Transaction completed");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = { Repository };
