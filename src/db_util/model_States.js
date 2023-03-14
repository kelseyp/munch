var { Sequelize, DataTypes } = require('sequelize');
var db = require('./dbConn.js');

module.exports = db.defineModel('tab_states', {
    name: DataTypes.STRING,
    short_name: DataTypes.STRING
  });