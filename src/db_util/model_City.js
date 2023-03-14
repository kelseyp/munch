var { Sequelize, DataTypes } = require('sequelize');
var db = require('./dbConn.js');

module.exports = db.defineModel('tab_cities', {
    name: DataTypes.STRING,
    county: DataTypes.STRING,
    zipcode: DataTypes.STRING
  })