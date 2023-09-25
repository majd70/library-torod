'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Category}) {
      this.belongsTo(User,{foreignKey:'user_id',as:'user'})
      this.belongsTo(Category,{foreignKey:'category_id',as:'category'})
    }
  }
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,     
        max: 5,    
      },
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      
    },
    category_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      
    }

  }, {
    sequelize,
    tableName:'books',
    modelName: 'Book',
  });
  return Book;
};