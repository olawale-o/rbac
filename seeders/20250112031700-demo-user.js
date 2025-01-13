"use strict";
const { hashPassword } = require("../utils/bcrypt");
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
      "users",
      [
        {
          full_name: "John Doe",
          email: "john@example.com",
          password: await hashPassword("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Jane Doe",
          email: "jane@example.com",
          password: await hashPassword("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Samuel Doe",
          email: "samuel@example.com",
          password: await hashPassword("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Keneth Doe",
          email: "keneth@example.com",
          password: await hashPassword("password"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Johnson Doe",
          email: "johnson@example.com",
          password: await hashPassword("password"),
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
