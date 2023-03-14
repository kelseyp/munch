var sequelize = require('./dbConn.js').sequelize;
var relation = require('./model_relations.js');

module.exports = {
  State:relation.State,
  City:relation.City,
  Tagtype: relation.Tagtype,
  Tag: relation.Tag,
  Resturant: relation.Resturant,
  Item: relation.Item
};

sequelize.sync({
    //force: true     
});