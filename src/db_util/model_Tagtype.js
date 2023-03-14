var { Sequelize, DataTypes } = require('sequelize');
var db = require('./dbConn.js');

module.exports = db.defineModel('tab_tag_types', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });