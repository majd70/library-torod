'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Book}) {
       this.belongsTo(User,{foreignKey:'user_id',as:'user'})
       this.hasMany(Book,{foreignKey:'category_id',as:'books'})
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      
    },
  }, {
    sequelize,
    tableName:'categories',
    modelName: 'Category',
  });
  return Category;
};