var sequelize = require('../db_util/dbConn.js').sequelize;
var State = require('../db_util/model_relations.js').State;
var City = require('../db_util/model_relations.js').City;
var Tag = require('../db_util/model_relations.js').Tag;
var Tagtype = require('../db_util/model_relations.js').Tagtype;
var Resturant = require('../db_util/model_relations.js').Resturant;
var Item = require('../db_util/model_relations.js').Item;

module.exports = {
    getStateList: async function(callback){
        await State.findAll(
            {attributes:['name','short_name'],where:{id:101}}
            ).then(states => res.json(states))
        }
}