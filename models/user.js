'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category,Book,Profile}) {
      this.hasMany(Category,{foreignKey:'user_id',as:'categories'})
      this.hasMany(Book,{foreignKey:'user_id',as:'books'})
      this.hasOne(Profile,{foreignKey:'user_id',as:'profile'})
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'), 
      allowNull: false,
      defaultValue: 'user', 
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};