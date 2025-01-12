"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, { through: models.UserRole });
      Role.belongsToMany(models.Permission, {
        through: {
          model: models.RoleGroupPermission,
          unique: false,
          scope: {
            permittableType: "role",
          },
        },
        foreignKey: "permittable_id",
        constraints: false,
      });
    }
  }
  Role.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    },
  );
  return Role;
};
