var { Sequelize, DataTypes } = require('sequelize');
var db = require('./dbConn.js');

module.exports = db.defineModel('tab_tags', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });