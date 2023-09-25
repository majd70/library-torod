'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User,{foreignKey:'user_id',as:'user'})
    }
  }
  Profile.init({
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      
    },
  }, {
    sequelize,
    tableName:'profiles',
    modelName: 'Profile',
  });
  return Profile;
};