var { Sequelize, DataTypes } = require('sequelize');
var db = require('./dbConn.js');

module.exports = db.defineModel('tab_items', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT
  })