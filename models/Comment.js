const { Models, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Models {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)