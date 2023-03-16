var sequelize = require('../db_util/dbConn.js').sequelize;

var State = require('../db_util/model_relations.js').State;
var City = require('../db_util/model_relations.js').City;
var Tag = require('../db_util/model_relations.js').Tag;
var Tagtype = require('../db_util/model_relations.js').Tagtype;
var Resturant = require('../db_util/model_relations.js').Resturant;
var Item = require('../db_util/model_relations.js').Item;

module.exports = {
    getStateList: function(data, callback){
        Item.findAll( {where: {id : 100}} ).then(function(p){
            callback(p);
        })
    }
}