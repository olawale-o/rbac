"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //
      UserRole.belongsToMany(models.Permission, {
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

      UserRole.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "roles_users",
      });
    }
  }
  UserRole.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "role_id",
        references: {
          model: {
            tableName: "roles",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "users_roles",
    },
  );
  return UserRole;
};
