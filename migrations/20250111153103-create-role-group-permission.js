"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles_groups_permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "permission_id",
        references: {
          model: {
            tableName: "permissions",
          },
          key: "id",
        },
      },
      permittableId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "permittable_id",
      },
      permittableType: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "permittable_type",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles_groups_permissions");
  },
};
