"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: {
          model: models.RoleGroupPermission,
          unique: false,
        },
        foreignKey: "permission_id",
        constraints: false,
      });
      Permission.belongsToMany(models.Group, {
        through: {
          model: models.RoleGroupPermission,
          unique: false,
        },
        foreignKey: "permission_id",
        constraints: false,
      });
    }

    async getPermittables(options) {
      const roles = await this.getRoles(options);
      const groups = await this.getGroups(options);
      // Concat images and videos in a single array of taggables
      return roles.concat(groups);
    }
  }
  Permission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
    },
  );
  return Permission;
};
