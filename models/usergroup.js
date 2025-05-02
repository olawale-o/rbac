const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserGroup.init(
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
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "group_id",

        references: {
          model: {
            tableName: "groups",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserGroup",
      tableName: "users_groups",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "group_id"],
        },
      ],
    },
  );
  return UserGroup;
};
