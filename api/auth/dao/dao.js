const db = require("../../../models");

const findById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      include: [
        {
          model: db.Role,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              model: db.UserRole,
              as: "user_role_permission",
              attributes: ["id"],

              include: [
                {
                  model: db.Permission,
                  attributes: ["id", "type"],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
        {
          model: db.Group,
          as: "groups",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              as: "user_group_permission",
              model: db.Permission,
              attributes: ["id", "type"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findByEmail = async (email) => {
  try {
    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Role,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              model: db.UserRole,
              as: "user_role_permission",
              attributes: ["id"],

              include: [
                {
                  model: db.Permission,
                  attributes: ["id", "type"],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
        {
          model: db.Group,
          as: "groups",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              as: "user_group_permission",
              model: db.Permission,
              attributes: ["id", "type"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { findByEmail };
