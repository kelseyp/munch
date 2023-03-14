var { Sequelize, DataTypes } = require('sequelize');
var db = require('./dbConn.js');

module.exports = db.defineModel('tab_resturants', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT
  });