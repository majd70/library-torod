'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('books', {
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
      title: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.FLOAT
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
      category_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'categories', 
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
        type:
        DataTypes.DATE
      }
        
    });
  
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('books');
  }
};