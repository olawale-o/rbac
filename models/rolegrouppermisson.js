"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleGroupPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      RoleGroupPermission.belongsTo(models.Role, {
        foreignKey: "permittable_id",
        constraints: false,
      });
      RoleGroupPermission.belongsTo(models.Group, {
        foreignKey: "permittable_id",
        constraints: false,
      });
    }
  }
  RoleGroupPermission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "permission_id",
      },
      permittableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "permittable_id",
        references: null,
      },
      permittableType: {
        type: DataTypes.STRING,
        allowNull: false,
        type: "permittable_type",
      },
    },
    {
      sequelize,
      modelName: "RoleGroupPermission",
      tableName: "roles_groups_permissions",
    },
  );

  RoleGroupPermission.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.permittableType === "role" && instance.role !== undefined) {
        instance.permittable = instance.role;
      } else if (
        instance.permittableType === "group" &&
        instance.group !== undefined
      ) {
        instance.permittable = instance.group;
      }
      // To prevent mistakes:
      delete instance.role;
      delete instance.dataValues.role;
      delete instance.group;
      delete instance.dataValues.group;
    }
  });
  return RoleGroupPermission;
};
