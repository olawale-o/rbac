"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users_groups",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        groupId: {
          type: Sequelize.INTEGER,
          field: "group_id",
          references: {
            model: {
              tableName: "groups",
            },
            key: "id",
          },
          unique: "actions_unique",
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "user_id",
          references: {
            model: {
              tableName: "users",
            },
            key: "id",
          },
          unique: "actions_unique",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ["group_id", "user_id"],
          },
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users_groups");
  },
};
