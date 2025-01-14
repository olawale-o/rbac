"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsToMany(models.User, {
        as: "users",
        through: models.UserGroup,
        foreignKey: "group_id",
      });
      Group.belongsToMany(models.Permission, {
        through: {
          model: models.RoleGroupPermission,
          unique: false,
          scope: {
            permittableType: "group",
          },
        },
        foreignKey: "permittable_id",
        constraints: false,
      });
    }
  }
  Group.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
    },
  );
  return Group;
};
