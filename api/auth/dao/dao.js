const repository = require("../repositiory/repository");

const findByEmail = async (email) => {
  try {
    user = await repository.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
};
module.exports = {
  findByEmail,
};
