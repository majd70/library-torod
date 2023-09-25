'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {

    await queryInterface.addColumn('users', 'resetToken', {
      type: DataTypes.STRING,
    });

    await queryInterface.addColumn('users', 'resetTokenExpires', {
      type: DataTypes.DATE,
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('users', 'resetToken');
    await queryInterface.removeColumn('users', 'resetTokenExpires');
  }
};
