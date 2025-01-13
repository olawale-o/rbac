"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          type: "can_view_users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_create_users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_update_users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_delete_users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_view_sales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_create_sales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_delete_sales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_update_sales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_view_engineering",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_update_backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_create_backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_delete_backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_view_backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_delete_frontend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_update_frontend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_view_frontend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "can_create_frontend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
