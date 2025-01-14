"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleGroupPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {}
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
        field: "permittable_type",
      },
    },
    {
      sequelize,
      modelName: "RoleGroupPermission",
      tableName: "roles_groups_permissions",
    },
  );

  return RoleGroupPermission;
};
