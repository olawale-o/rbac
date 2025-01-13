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
      "roles_groups_permissions",
      [
        {
          permission_id: 1,
          permittable_id: 1,
          permittable_type: "group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 2,
          permittable_id: 1,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 3,
          permittable_id: 1,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 4,
          permittable_id: 1,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 5,
          permittable_id: 2,
          permittable_type: "group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 6,
          permittable_id: 2,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 7,
          permittable_id: 2,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 8,
          permittable_id: 2,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 9,
          permittable_id: 3,
          permittable_type: "group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 10,
          permittable_id: 3,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 11,
          permittable_id: 3,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 12,
          permittable_id: 3,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 13,
          permittable_id: 3,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 14,
          permittable_id: 4,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 15,
          permittable_id: 4,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 16,
          permittable_id: 4,
          permittable_type: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission_id: 17,
          permittable_id: 4,
          permittable_type: "role",
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
    await queryInterface.bulkDelete("roles_groups_permissions", null, {});
  },
};
