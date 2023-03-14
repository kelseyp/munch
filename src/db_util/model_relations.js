var State = require('./model_States.js')
var City = require('./model_City.js')
var Tagtype = require('./model_Tagtype.js')
var Tag = require('./model_Tag.js')
var Resturant = require('./model_Resturant.js')
var Item = require('./model_Item.js')



//1:N
State.hasMany(City);
City.belongsTo(State);
Tagtype.hasMany(Tag);
Tag.belongsTo(Tagtype);
City.hasMany(Resturant);
Resturant.belongsTo(City);
Resturant.hasMany(Item);
Item.belongsTo(Resturant);

//N:M
Resturant.belongsToMany(Tag, { through: 'ref_resturant_tag' });
Tag.belongsToMany(Resturant, { through: 'ref_resturant_tag' });

Item.belongsToMany(Tag, { through: 'ref_item_tag' });
Tag.belongsToMany(Item, { through: 'ref_item_tag' });



module.exports = {
    State: State,
    City: City,
    Tagtype: Tagtype,
    Tag: Tag,
    Resturant: Resturant,
    Item: Item
};