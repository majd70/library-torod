'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('categories');
  }
};