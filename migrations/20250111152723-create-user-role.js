"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users_roles",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "role_id",
          references: {
            model: {
              tableName: "roles",
            },
            key: "id",
          },
          unique: "actions_unique",
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ["role_id", "user_id"],
          },
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users_roles");
  },
};
